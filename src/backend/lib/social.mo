import Debug "mo:core/Debug";
import List "mo:core/List";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Types "../types/social";
import PMTypes "../types/projects-and-media";

module {
  // ---- Likes ----

  /// Record a like by `caller` on `projectId`. No-op if already liked.
  public func likeProject(
    likes : Map.Map<PMTypes.ProjectId, Set.Set<Principal>>,
    caller : Principal,
    projectId : PMTypes.ProjectId,
  ) {
    Debug.todo();
  };

  /// Remove a like by `caller` on `projectId`. No-op if not liked.
  public func unlikeProject(
    likes : Map.Map<PMTypes.ProjectId, Set.Set<Principal>>,
    caller : Principal,
    projectId : PMTypes.ProjectId,
  ) {
    Debug.todo();
  };

  /// Return the number of likes for a project.
  public func getLikeCount(
    likes : Map.Map<PMTypes.ProjectId, Set.Set<Principal>>,
    projectId : PMTypes.ProjectId,
  ) : Nat {
    Debug.todo();
  };

  /// Return whether `caller` has liked `projectId`.
  public func hasLiked(
    likes : Map.Map<PMTypes.ProjectId, Set.Set<Principal>>,
    caller : Principal,
    projectId : PMTypes.ProjectId,
  ) : Bool {
    Debug.todo();
  };

  // ---- Comments ----

  /// Add a comment by `caller` on `projectId`. Returns the new comment.
  public func addComment(
    comments : List.List<Types.Comment>,
    nextCommentId : { var value : Nat },
    caller : Principal,
    projectId : PMTypes.ProjectId,
    text : Text,
  ) : Types.Comment {
    Debug.todo();
  };

  /// Delete a comment. Returns false if the comment was not found or caller is not authorised.
  public func deleteComment(
    comments : List.List<Types.Comment>,
    caller : Principal,
    commentId : Types.CommentId,
    projectOwnerId : ?Principal,
  ) : Bool {
    Debug.todo();
  };

  /// List all comments for a project, resolved to CommentView with commenter names.
  public func listComments(
    comments : List.List<Types.Comment>,
    projectId : PMTypes.ProjectId,
    resolveName : Principal -> Text,
  ) : [Types.CommentView] {
    Debug.todo();
  };

  // ---- Follow ----

  /// Follow `target` as `caller`.
  public func followUser(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    caller : Principal,
    target : Principal,
  ) {
    Debug.todo();
  };

  /// Unfollow `target` as `caller`.
  public func unfollowUser(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    caller : Principal,
    target : Principal,
  ) {
    Debug.todo();
  };

  /// Returns true if `caller` follows `target`.
  public func isFollowing(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    caller : Principal,
    target : Principal,
  ) : Bool {
    Debug.todo();
  };

  /// Returns the number of principals following `target`.
  public func getFollowerCount(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    target : Principal,
  ) : Nat {
    Debug.todo();
  };

  /// Returns the number of principals `subject` is following.
  public func getFollowingCount(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    subject : Principal,
  ) : Nat {
    Debug.todo();
  };

  /// Returns an array of principals that follow `target`.
  public func listFollowers(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    target : Principal,
  ) : [Principal] {
    Debug.todo();
  };

  /// Returns an array of principals that `subject` is following.
  public func listFollowing(
    follows : Map.Map<Principal, Set.Set<Principal>>,
    subject : Principal,
  ) : [Principal] {
    Debug.todo();
  };
};
