import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Types "types/projects-and-media";
import ProjectsAndMediaApi "mixins/projects-and-media-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Domain state
  let projects = List.empty<Types.Project>();
  let media = List.empty<Types.MediaItem>();
  let profiles = Map.empty<Principal, Types.UserProfile>();
  let nextProjectId = { var value : Nat = 0 };
  let nextMediaId = { var value : Nat = 0 };

  include ProjectsAndMediaApi(
    accessControlState,
    projects,
    media,
    profiles,
    nextProjectId,
    nextMediaId,
  );
};
