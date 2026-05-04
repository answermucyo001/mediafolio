import Debug "mo:core/Debug";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Types "../types/social";
import PMTypes "../types/projects-and-media";

mixin (
  likes : Map.Map<PMTypes.ProjectId, Set.Set<Principal>>,
  comments : List.List<Types.Comment>,
  nextCommentId : { var value : Nat },
  follows : Map.Map<Principal, Set.Set<Principal>>,
  resolveProfileName : Principal -> Text,
  resolveProjectOwner : PMTypes.ProjectId -> ?Principal,
) {

  // ---- Likes ----

  public shared ({ caller }) func likeProject(projectId : PMTypes.ProjectId) : async () {
    Debug.todo();
  };

  public shared ({ caller }) func unlikeProject(projectId : PMTypes.ProjectId) : async () {
    Debug.todo();
  };

  public query func getLikeCount(projectId : PMTypes.ProjectId) : async Nat {
    Debug.todo();
  };

  public shared query ({ caller }) func hasLiked(projectId : PMTypes.ProjectId) : async Bool {
    Debug.todo();
  };

  // ---- Comments ----

  public shared ({ caller }) func addComment(projectId : PMTypes.ProjectId, text : Text) : async Types.CommentView {
    Debug.todo();
  };

  public shared ({ caller }) func deleteComment(commentId : Types.CommentId) : async Bool {
    Debug.todo();
  };

  public query func listComments(projectId : PMTypes.ProjectId) : async [Types.CommentView] {
    Debug.todo();
  };

  // ---- Follow ----

  public shared ({ caller }) func followUser(target : Principal) : async () {
    Debug.todo();
  };

  public shared ({ caller }) func unfollowUser(target : Principal) : async () {
    Debug.todo();
  };

  public shared query ({ caller }) func isFollowing(target : Principal) : async Bool {
    Debug.todo();
  };

  public query func getFollowerCount(target : Principal) : async Nat {
    Debug.todo();
  };

  public query func getFollowingCount(subject : Principal) : async Nat {
    Debug.todo();
  };

  public query func listFollowers(target : Principal) : async [Principal] {
    Debug.todo();
  };

  public query func listFollowing(subject : Principal) : async [Principal] {
    Debug.todo();
  };
};
