class UserInfo {
  constructor(userNameSelector, userProfessionSelector) {
    this._userNameElement = userNameSelector;
    this._userProfessionElement = userProfessionSelector;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userProfession: this._userProfessionElement.textContent,
    };
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userProfessionElement.textContent = about;
  }
}

export default UserInfo;
