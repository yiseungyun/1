interface SocialUser {
  loginType: "social";
  email: string;
  nickname?: string;
}

interface GuestUser {
  loginType: "guest";
  nickname?: string;
}

interface NormalUser {
  loginType: "normal";
  name: string;
  nickname?: string;
}

type User = SocialUser | GuestUser | NormalUser;

function getUserDisplayName(user: User) {
  if (user.loginType === "guest") {
    return "Anonymous";
  }

  if (user.nickname) {
    return user.nickname;
  }

  if (user.loginType === "normal") {
    return user.name;
  }

  if (user.loginType === "social") {
    return user.email;
  }

  return "Anonymous";
}

const user1: User = {
  loginType: "normal",
  name: "Alice",
};

const user2: User = {
  loginType: "guest",
};

console.log(getUserDisplayName(user1)); // "Alice"
console.log(getUserDisplayName(user2)); // "Anonymous"