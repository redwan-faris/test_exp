const actions = {
  logout: "logout",
};

type ServerActions = keyof typeof actions;

export const serverActions = (action: ServerActions) => {
  return actions[action];
};
