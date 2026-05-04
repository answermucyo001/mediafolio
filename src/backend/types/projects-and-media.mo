import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProjectId = Nat;
  public type MediaId = Nat;

  public type Project = {
    id : ProjectId;
    owner : Principal;
    title : Text;
    description : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type MediaType = {
    #photo;
    #video;
    #audio;
  };

  public type MediaItem = {
    id : MediaId;
    projectId : ProjectId;
    name : Text;
    mediaType : MediaType;
    blob : Storage.ExternalBlob;
    caption : Text;
    uploadedAt : Int;
  };

  public type UserProfile = {
    name : Text;
    avatar : ?Storage.ExternalBlob;
  };

  // Shared-safe (no var fields, no mutable containers) view types for API boundary
  public type ProjectView = {
    id : ProjectId;
    owner : Text; // Principal as Text
    title : Text;
    description : Text;
    createdAt : Int;
    updatedAt : Int;
  };

  public type MediaItemView = {
    id : MediaId;
    projectId : ProjectId;
    name : Text;
    mediaType : MediaType;
    blob : Storage.ExternalBlob;
    caption : Text;
    uploadedAt : Int;
  };

  public type PortfolioView = {
    owner : Text;
    profile : ?UserProfile;
    projects : [ProjectView];
    media : [MediaItemView];
  };
};
