module {
  public type CommentId = Nat;

  public type Comment = {
    id : CommentId;
    projectId : Nat; // ProjectId from projects-and-media domain
    author : Principal;
    text : Text;
    createdAt : Int;
  };

  public type CommentView = {
    id : CommentId;
    projectId : Nat;
    authorPrincipal : Text; // Principal as Text
    authorName : Text;     // display name from user profile
    text : Text;
    createdAt : Int;
  };

  public type SocialStats = {
    likeCount : Nat;
    commentCount : Nat;
    followerCount : Nat;
    followingCount : Nat;
  };
};
