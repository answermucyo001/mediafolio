import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/projects-and-media";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // ── Project operations ──────────────────────────────────────────────────────

  public func createProject(
    projects : List.List<Types.Project>,
    nextId : Nat,
    owner : Principal,
    title : Text,
    description : Text,
  ) : Types.Project {
    let now = Time.now();
    let project : Types.Project = {
      id = nextId;
      owner;
      title;
      description;
      createdAt = now;
      updatedAt = now;
    };
    projects.add(project);
    project;
  };

  public func getProject(
    projects : List.List<Types.Project>,
    id : Types.ProjectId,
  ) : ?Types.Project {
    projects.find(func(p) { p.id == id });
  };

  public func listProjectsByOwner(
    projects : List.List<Types.Project>,
    owner : Principal,
  ) : [Types.ProjectView] {
    projects
      .filter(func(p) { Principal.equal(p.owner, owner) })
      .map<Types.Project, Types.ProjectView>(func(p) { toProjectView(p) })
      .toArray();
  };

  public func updateProject(
    projects : List.List<Types.Project>,
    caller : Principal,
    id : Types.ProjectId,
    title : Text,
    description : Text,
  ) : Bool {
    switch (projects.findIndex(func(p) { p.id == id and Principal.equal(p.owner, caller) })) {
      case (?idx) {
        let existing = projects.at(idx);
        projects.put(idx, { existing with title; description; updatedAt = Time.now() });
        true;
      };
      case null { false };
    };
  };

  public func deleteProject(
    projects : List.List<Types.Project>,
    media : List.List<Types.MediaItem>,
    caller : Principal,
    id : Types.ProjectId,
  ) : Bool {
    switch (projects.findIndex(func(p) { p.id == id and Principal.equal(p.owner, caller) })) {
      case (?_) {
        let kept = projects.filter(func(p) { p.id != id });
        projects.clear();
        projects.append(kept);
        let keptMedia = media.filter(func(m) { m.projectId != id });
        media.clear();
        media.append(keptMedia);
        true;
      };
      case null { false };
    };
  };

  public func toProjectView(project : Types.Project) : Types.ProjectView {
    {
      id = project.id;
      owner = project.owner.toText();
      title = project.title;
      description = project.description;
      createdAt = project.createdAt;
      updatedAt = project.updatedAt;
    };
  };

  // ── Media operations ────────────────────────────────────────────────────────

  public func addMediaItem(
    media : List.List<Types.MediaItem>,
    nextId : Nat,
    projectId : Types.ProjectId,
    name : Text,
    mediaType : Types.MediaType,
    blob : Storage.ExternalBlob,
    caption : Text,
  ) : Types.MediaItem {
    let item : Types.MediaItem = {
      id = nextId;
      projectId;
      name;
      mediaType;
      blob;
      caption;
      uploadedAt = Time.now();
    };
    media.add(item);
    item;
  };

  public func listMediaByProject(
    media : List.List<Types.MediaItem>,
    projectId : Types.ProjectId,
  ) : [Types.MediaItemView] {
    media
      .filter(func(m) { m.projectId == projectId })
      .map<Types.MediaItem, Types.MediaItemView>(func(m) { toMediaItemView(m) })
      .toArray();
  };

  public func deleteMediaItem(
    media : List.List<Types.MediaItem>,
    caller : Principal,
    projects : List.List<Types.Project>,
    mediaId : Types.MediaId,
  ) : Bool {
    // Caller must own the project that contains the media item
    switch (media.find(func(m) { m.id == mediaId })) {
      case (?item) {
        switch (projects.find(func(p) { p.id == item.projectId and Principal.equal(p.owner, caller) })) {
          case (?_) {
            let kept = media.filter(func(m) { m.id != mediaId });
            media.clear();
            media.append(kept);
            true;
          };
          case null { false };
        };
      };
      case null { false };
    };
  };

  public func toMediaItemView(item : Types.MediaItem) : Types.MediaItemView {
    {
      id = item.id;
      projectId = item.projectId;
      name = item.name;
      mediaType = item.mediaType;
      blob = item.blob;
      caption = item.caption;
      uploadedAt = item.uploadedAt;
    };
  };

  // ── Portfolio query ─────────────────────────────────────────────────────────

  public func getPortfolio(
    projects : List.List<Types.Project>,
    media : List.List<Types.MediaItem>,
    profiles : Map.Map<Principal, Types.UserProfile>,
    owner : Principal,
  ) : Types.PortfolioView {
    let ownerProjects = listProjectsByOwner(projects, owner);
    let projectIds : [Types.ProjectId] = ownerProjects.map<Types.ProjectView, Types.ProjectId>(func(p) { p.id });
    let ownerMedia = media
      .filter(func(m) {
        switch (projectIds.find(func(pid) { pid == m.projectId })) {
          case (?_) { true };
          case null { false };
        };
      })
      .map<Types.MediaItem, Types.MediaItemView>(func(m) { toMediaItemView(m) })
      .toArray();
    {
      owner = owner.toText();
      profile = profiles.get(owner);
      projects = ownerProjects;
      media = ownerMedia;
    };
  };
};
