import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/projects-and-media";
import ProjectsLib "../lib/projects-and-media";

mixin (
  accessControlState : AccessControl.AccessControlState,
  projects : List.List<Types.Project>,
  media : List.List<Types.MediaItem>,
  profiles : Map.Map<Principal, Types.UserProfile>,
  nextProjectId : { var value : Nat },
  nextMediaId : { var value : Nat },
) {

  // ── User profile ────────────────────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    profiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Types.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    profiles.add(caller, profile);
  };

  // ── Projects ────────────────────────────────────────────────────────────────

  public shared ({ caller }) func createProject(title : Text, description : Text) : async Types.ProjectView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let id = nextProjectId.value;
    nextProjectId.value += 1;
    let project = ProjectsLib.createProject(projects, id, caller, title, description);
    ProjectsLib.toProjectView(project);
  };

  public query ({ caller }) func listMyProjects() : async [Types.ProjectView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProjectsLib.listProjectsByOwner(projects, caller);
  };

  public query ({ caller }) func getProject(id : Types.ProjectId) : async ?Types.ProjectView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (ProjectsLib.getProject(projects, id)) {
      case (?p) { ?ProjectsLib.toProjectView(p) };
      case null { null };
    };
  };

  public shared ({ caller }) func updateProject(
    id : Types.ProjectId,
    title : Text,
    description : Text,
  ) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProjectsLib.updateProject(projects, caller, id, title, description);
  };

  public shared ({ caller }) func deleteProject(id : Types.ProjectId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProjectsLib.deleteProject(projects, media, caller, id);
  };

  // ── Media ───────────────────────────────────────────────────────────────────

  public shared ({ caller }) func addMedia(
    projectId : Types.ProjectId,
    name : Text,
    mediaType : Types.MediaType,
    blob : Storage.ExternalBlob,
    caption : Text,
  ) : async Types.MediaItemView {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    // Verify the caller owns the target project
    switch (ProjectsLib.getProject(projects, projectId)) {
      case (?p) {
        if (not Principal.equal(p.owner, caller)) {
          Runtime.trap("Unauthorized: not project owner");
        };
      };
      case null { Runtime.trap("Project not found") };
    };
    let id = nextMediaId.value;
    nextMediaId.value += 1;
    let item = ProjectsLib.addMediaItem(media, id, projectId, name, mediaType, blob, caption);
    ProjectsLib.toMediaItemView(item);
  };

  public query ({ caller }) func listProjectMedia(projectId : Types.ProjectId) : async [Types.MediaItemView] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProjectsLib.listMediaByProject(media, projectId);
  };

  public shared ({ caller }) func deleteMedia(mediaId : Types.MediaId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProjectsLib.deleteMediaItem(media, caller, projects, mediaId);
  };

  // ── Public portfolio ────────────────────────────────────────────────────────

  public query func getPortfolio(owner : Principal) : async Types.PortfolioView {
    ProjectsLib.getPortfolio(projects, media, profiles, owner);
  };
};
