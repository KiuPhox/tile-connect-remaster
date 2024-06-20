(function () {"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// <define:__GAME_SDK_CONFIG__>
var define_GAME_SDK_CONFIG_default;
var init_define_GAME_SDK_CONFIG = __esm({
  "<define:__GAME_SDK_CONFIG__>"() {
    define_GAME_SDK_CONFIG_default = { MSGames: { UseLoginFeature: false } };
  }
});

// <define:__INIT_CONFIG__>
var init_define_INIT_CONFIG = __esm({
  "<define:__INIT_CONFIG__>"() {
  }
});

// libs/empty-script.js
var empty_script_exports = {};
__export(empty_script_exports, {
  default: () => empty_script_default
});
var empty_script_default;
var init_empty_script = __esm({
  "libs/empty-script.js"() {
    "use strict";
    init_define_GAME_SDK_CONFIG();
    init_define_INIT_CONFIG();
    empty_script_default = {};
  }
});

// src/game-sdk/index.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
init_empty_script();
init_empty_script();
init_empty_script();
init_empty_script();
init_empty_script();

// src/game-sdk/adapters/msgames/MSAdapter.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();

// src/game-sdk/sdk/GameSDK.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();

// src/game-sdk/sdk/Context.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var _Context = class _Context {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "extra");
    __publicField(this, "currentContextID", null);
    __publicField(this, "currentContextType", "SOLO");
    __publicField(this, "currentContextPlayers", []);
    __publicField(this, "chooseAsyncPopup", null);
    __publicField(this, "createAsyncPopup", null);
    __publicField(this, "switchAsyncPopup", null);
    __publicField(this, "contextIdsByCreate");
    __publicField(this, "contextIdsByChoose", []);
    __publicField(this, "playerIdsInContexts");
    __publicField(this, "handleOnYes", /* @__PURE__ */ __name((resolve) => () => {
      this.extra.isPopupShown = false;
      resolve(true);
    }, "handleOnYes"));
    __publicField(this, "handleOnNo", /* @__PURE__ */ __name((reject) => () => {
      this.extra.isPopupShown = false;
      try {
        this.extra.exceptionUserInput("Player closed the context menu");
      } catch (error) {
        reject(error);
      }
    }, "handleOnNo"));
    this.adapter = adapter;
    this.extra = adapter.extra;
  }
  setCurrentContextId(contextId) {
    this.checkSameContext(contextId);
    this.currentContextID = contextId;
    this.currentContextType = "THREAD";
  }
  initContextInfo(contextId, contextType) {
    this.contextIdsByCreate = {};
    this.playerIdsInContexts = {};
    this.contextIdsByChoose = Array.from(
      { length: 10 },
      () => GameCore.Utils.Number.random(10).toString()
    );
    if (!contextId || !contextType) return;
    if (!["SOLO", "THREAD", "POST", "GROUP"].includes(contextType)) {
      console.warn(`Invalid context type: ${contextType}`);
      return;
    }
    this.currentContextID = contextId;
    this.currentContextType = contextType;
  }
  getID() {
    return this.currentContextID;
  }
  getType() {
    return this.currentContextType;
  }
  async loadSwitchAsyncPopup() {
    if (this.switchAsyncPopup) return;
    const SwitchAsyncPopup = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof SwitchAsyncPopup !== "function") return;
    this.switchAsyncPopup = new SwitchAsyncPopup();
  }
  async loadChooseAsyncPopup() {
    if (this.chooseAsyncPopup) return;
    const ChooseAsyncPopup = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof ChooseAsyncPopup !== "function") return;
    this.chooseAsyncPopup = new ChooseAsyncPopup();
  }
  async loadCreateAsyncPopup() {
    if (this.createAsyncPopup) return;
    const CreateAsyncPopup = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof CreateAsyncPopup !== "function") return;
    this.createAsyncPopup = new CreateAsyncPopup();
  }
  async switchAsync(contextId, switchSilentlyIfSolo = false) {
    this.extra.checkPopupShown();
    await this.extra.awaitRandomDelay();
    this.validateSwitchAsyncContextId(contextId);
    if (contextId === "SOLO" && switchSilentlyIfSolo) {
      this.currentContextID = null;
      this.currentContextType = "SOLO";
      this.updatePlayers([]);
      return;
    }
    await this.loadSwitchAsyncPopup();
    await new Promise((resolve, reject) => {
      if (!this.switchAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.switchAsyncPopup.onYes(this.handleOnYes(resolve));
      this.switchAsyncPopup.onNo(this.handleOnNo(reject));
      this.switchAsyncPopup.show(contextId);
      this.extra.isPopupShown = true;
    });
    this.currentContextID = contextId;
    this.currentContextType = "THREAD";
    this.createPlayerIdsInContext(contextId, 10);
    const playerIds = this.playerIdsInContexts[contextId];
    const players = playerIds.map((playerId) => this.createPlayerInfo(playerId));
    this.updatePlayers(players);
  }
  async chooseAsync(_options) {
    this.extra.checkPopupShown();
    await this.extra.awaitRandomDelay();
    await this.loadChooseAsyncPopup();
    await new Promise((resolve, reject) => {
      if (!this.chooseAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.chooseAsyncPopup.onYes(this.handleOnYes(resolve));
      this.chooseAsyncPopup.onNo(this.handleOnNo(reject));
      this.chooseAsyncPopup.show();
      this.extra.isPopupShown = true;
    });
    const rand = Math.floor(Math.random() * this.contextIdsByChoose.length);
    const contextId = this.contextIdsByChoose[rand];
    this.checkSameContext(contextId);
    this.currentContextID = contextId;
    this.currentContextType = "THREAD";
    this.createPlayerIdsInContext(contextId, 2);
    const playerIds = this.playerIdsInContexts[contextId];
    const players = playerIds.map((playerId) => this.createPlayerInfo(playerId));
    this.updatePlayers(players);
  }
  async createAsync(playerId) {
    this.extra.checkPopupShown();
    await this.extra.awaitRandomDelay();
    await this.validateCreateAsyncPlayerId(playerId);
    await this.loadCreateAsyncPopup();
    await new Promise((resolve, reject) => {
      if (!this.createAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.createAsyncPopup.onYes(this.handleOnYes(resolve));
      this.createAsyncPopup.onNo(this.handleOnNo(reject));
      this.createAsyncPopup.show(playerId);
      this.extra.isPopupShown = true;
    });
    if (!this.contextIdsByCreate[playerId]) {
      this.contextIdsByCreate[playerId] = GameCore.Utils.Number.random(10).toString();
    }
    const contextId = this.contextIdsByCreate[playerId];
    this.checkSameContext(contextId);
    this.currentContextID = contextId;
    this.currentContextType = "THREAD";
    const player = this.createPlayerInfo(playerId);
    this.updatePlayers([player]);
  }
  async getPlayersAsync() {
    await this.extra.awaitRandomDelay();
    return this.currentContextPlayers;
  }
  createPlayerIdsInContext(contextId, maxPlayers) {
    if (!this.playerIdsInContexts[contextId]) {
      const rand = Math.floor(Math.random() * maxPlayers);
      const playerIds = Array.from(
        { length: rand },
        () => GameCore.Utils.Number.random(10).toString()
      );
      this.playerIdsInContexts[contextId] = playerIds;
    }
    return this.playerIdsInContexts[contextId];
  }
  createPlayerInfo(playerId) {
    return {
      getID: /* @__PURE__ */ __name(() => playerId, "getID"),
      getName: /* @__PURE__ */ __name(() => `Player ${playerId}`, "getName"),
      getPhoto: /* @__PURE__ */ __name(() => "", "getPhoto")
    };
  }
  updatePlayers(players) {
    if (this.currentContextType === "SOLO") {
      this.currentContextPlayers = [];
      return;
    }
    this.currentContextPlayers = players;
  }
  checkSameContext(contextId) {
    if (this.currentContextID === contextId) {
      this.extra.exceptionSameContext();
    }
  }
  async validateCreateAsyncPlayerId(playerId) {
    if (!playerId || Array.isArray(playerId)) {
      const message2 = "Client does not support no player IDS or multiple player IDs yet" /* NOT_NO_OR_MULTIPLE_IDS */;
      this.extra.exceptionClientUnsupportedOperation(message2);
    }
    if (!GameCore.Utils.Valid.isString(playerId)) {
      const message2 = `Array of type String contained a value of another type: ${playerId}`;
      this.extra.exceptionInvalidParam(message2);
    }
    if (playerId === GameSDK.player.getID()) {
      const message2 = "'At least one player id besides the current player must be provided.'" /* ONE_BESIDES_CURRENT_PLAYER_ID */;
      this.extra.exceptionInvalidParam(message2);
    }
    const connectedPlayers = await GameSDK.player.getConnectedPlayersAsync();
    const providedIdInConnectedPlayers = connectedPlayers.some(
      (connectedPlayer) => connectedPlayer.getID() === playerId
    );
    if (providedIdInConnectedPlayers) return;
    const message = `Provided ID ${playerId} is not a connected player of the current player.`;
    this.extra.exceptionInvalidParam(message);
  }
  validateSwitchAsyncContextId(contextId) {
    this.checkSameContext(contextId);
    if (GameCore.Utils.Valid.isString(contextId)) return;
    const message = "Client requires update to support this operation" /* REQUIRE_UPDATE */;
    this.extra.exceptionClientUnsupportedOperation(message);
  }
};
__name(_Context, "Context");
var Context = _Context;
var Context_default = Context;

// src/game-sdk/sdk/Extra.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();

// src/game-sdk/common/LoadingScreenElement.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var html = (
  /*html*/
  `
<div id="lds-dual-ring"></div>
<div id="lds-text">
    <span id="lds-percent">0</span>%
</div>
`
);
var css = (
  /*css*/
  `
#lds-dual-ring {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #515151 transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
    -webkit-animation: lds-dual-ring 1.2s linear infinite;
}

#lds-text {
    color: #fff;
    font-family: monospace;
    display: flex;
    font-size: 1.2rem;
    position: absolute;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-shadow: 0 0.5px 1px #999;
}

#lds-content {
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #515151;
    pointer-events: none;
    transition: background-color 0.5s ease-in-out;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`
);
var loadingId = "lds-content";
var _LoadingScreenElement = class _LoadingScreenElement {
  constructor() {
    __publicField(this, "percentage", 0);
    document.addEventListener("DOMContentLoaded", () => {
      this.createLoadingElement();
      this.addLoadingElementStyle();
      const observer = new MutationObserver(() => {
        const gameDiv = document.getElementById("GameDiv");
        if (!gameDiv) return;
        this.setupLoadingElementSizeAndPosition();
      });
      const config = {
        attributes: true,
        childList: true,
        subtree: true
      };
      const target = document.body;
      observer.observe(target, config);
    });
  }
  createLoadingElement() {
    const loadingElement = document.createElement("div");
    loadingElement.id = loadingId;
    loadingElement.innerHTML = html;
    document.body.appendChild(loadingElement);
    return loadingElement;
  }
  addLoadingElementStyle() {
    const style = document.createElement("style");
    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
  setupLoadingElementSizeAndPosition() {
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement) return;
    const gameDiv = document.getElementById("GameDiv");
    if (!gameDiv) return;
    const { width, height } = gameDiv.getBoundingClientRect();
    loadingElement.style.width = `${width}px`;
    loadingElement.style.height = `${height}px`;
    const { width: cWidth, height: cHeight } = document.body.getBoundingClientRect();
    loadingElement.style.left = `${(cWidth - width) / 2}px`;
    loadingElement.style.top = `${(cHeight - height) / 2}px`;
  }
  setLoadingProgress(percentage) {
    if (percentage === this.percentage) return;
    if (this.percentage > percentage) return;
    this.percentage = percentage;
    const loadingPercent = document.getElementById("lds-percent");
    if (!loadingPercent) return;
    loadingPercent.innerHTML = `${percentage}`;
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement) return;
    const opacity = Math.min(0.9, 0.1 + percentage / 100);
    loadingElement.style.backgroundColor = `rgba(81, 81, 81, ${opacity})`;
  }
  removeLoadingElement() {
    const loadingElement = document.getElementById(loadingId);
    if (!loadingElement) return;
    loadingElement.style.backgroundColor = `rgba(81, 81, 81, 0)`;
    setTimeout(() => {
      loadingElement.remove();
    }, 300);
  }
};
__name(_LoadingScreenElement, "LoadingScreenElement");
var LoadingScreenElement = _LoadingScreenElement;
var LoadingScreenElement_default = LoadingScreenElement;

// src/game-sdk/exceptions/SDKCommonError.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var _SDKCommonError = class _SDKCommonError extends Error {
  constructor(code, message) {
    super(message);
    __publicField(this, "code");
    this.code = code;
  }
};
__name(_SDKCommonError, "SDKCommonError");
var SDKCommonError = _SDKCommonError;
var SDKCommonError_default = SDKCommonError;

// src/game-sdk/sdk/Extra.ts
var _Extra = class _Extra {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "isPopupShown", false);
    __publicField(this, "maxWaitGameCoreReadyTime", 1e4);
    __publicField(this, "loadingElement", null);
    this.adapter = adapter;
  }
  async subscribeBotAsync() {
    const canSubscribeBot = await this.adapter.player.canSubscribeBotAsync();
    if (!canSubscribeBot) return false;
    const { analytics } = window.game;
    const { BOT_SUBSCRIBE, BOT_SUBSCRIBE_POPUP } = GameCore.Plugins.Analytics.Events;
    analytics.event(BOT_SUBSCRIBE_POPUP);
    try {
      await this.waitSDKInitiatedAsync();
      await this.adapter.player.subscribeBotAsync();
      analytics.event(BOT_SUBSCRIBE, { success: true });
      return true;
    } catch (error) {
      analytics.event(BOT_SUBSCRIBE, { success: false });
      return false;
    }
  }
  async checkAndCreateShortcutAsync() {
    const canCreateShortcut = await this.adapter.canCreateShortcutAsync();
    if (!canCreateShortcut) return;
    const { analytics } = window.game;
    const { SHORTCUT_CREATE, SHORTCUT_CREATE_POPUP } = GameCore.Plugins.Analytics.Events;
    analytics.event(SHORTCUT_CREATE_POPUP);
    try {
      await this.waitSDKInitiatedAsync();
      await this.adapter.createShortcutAsync();
      analytics.event(SHORTCUT_CREATE, { success: true });
    } catch (error) {
      analytics.event(SHORTCUT_CREATE, { success: false });
    }
  }
  waitSDKInitiatedAsync() {
    return GameCore.Utils.Valid.isValueChangeAsync(window.__sdkInitiated, true);
  }
  async waitGameCoreReadyAsync() {
    let waitTime = 0;
    return new Promise((resolve) => {
      const waitInterval = setInterval(() => {
        if ("GameCore" in window) {
          clearInterval(waitInterval);
          resolve();
          return;
        }
        waitTime += 100;
        if (waitTime > this.maxWaitGameCoreReadyTime) {
          waitTime = 0;
          console.warn("GameCore is slow to load, please check your network connection.");
        }
      }, 100);
    });
  }
  createLoadingElement() {
    if (this.loadingElement) return;
    this.loadingElement = new LoadingScreenElement_default();
  }
  setLoadingElementProgress(progress) {
    if (!this.loadingElement) return;
    this.loadingElement.setLoadingProgress(progress);
  }
  destroyLoadingElement() {
    if (!this.loadingElement) return;
    this.loadingElement.removeLoadingElement();
  }
  checkPopupShown() {
    if (!this.isPopupShown) return;
    this.exceptionPendingRequest("Please wait for the popup to close");
  }
  async delayInitialAsync() {
    const { SlowAPI } = GameCore.Configs.Mockup.GameSDK;
    if (!SlowAPI.Enabled || SlowAPI.InitialDelay <= 0) return;
    await GameCore.Utils.Time.sleepAsync(SlowAPI.InitialDelay);
  }
  async delayStartAsync() {
    const { SlowAPI } = GameCore.Configs.Mockup.GameSDK;
    if (!SlowAPI.Enabled || SlowAPI.StartDelay <= 0) return;
    await GameCore.Utils.Time.sleepAsync(SlowAPI.StartDelay);
  }
  async delayPlayerDataAsync() {
    const { SlowAPI } = GameCore.Configs.Mockup.GameSDK;
    if (!SlowAPI.Enabled || SlowAPI.PlayerDataDelay <= 0) return;
    await GameCore.Utils.Time.sleepAsync(SlowAPI.PlayerDataDelay);
  }
  awaitRandomDelay(randomDelayMs = 1e3) {
    return GameCore.Utils.Time.sleepAsync(Math.random() * randomDelayMs);
  }
  randomException(exceptions) {
    const rand = Math.floor(Math.random() * exceptions.length);
    const exception = exceptions[rand];
    console.warn("Random exception", exception);
    this[`exception${exception}`]();
  }
  // ? Why is this method here?
  // * Make reduce code size and make it easier to read
  throwNewCommonError(code, message) {
    throw new SDKCommonError_default(code, message);
  }
  exceptionUserInput(message) {
    this.throwNewCommonError("USER_INPUT" /* USER_INPUT */, message);
  }
  exceptionUnsupported() {
    this.throwNewCommonError("UNSUPPORTED" /* UNSUPPORTED */, "Unsupported method");
  }
  exceptionInvalidParam(message) {
    this.throwNewCommonError("INVALID_PARAM" /* INVALID_PARAM */, message);
  }
  exceptionPendingRequest(message) {
    this.throwNewCommonError("PENDING_REQUEST" /* PENDING_REQUEST */, message);
  }
  exceptionMethodNotImplemented() {
    this.throwNewCommonError("METHOD_NOT_IMPLEMENTED" /* METHOD_NOT_IMPLEMENTED */, "Method not implemented");
  }
  exceptionTournamentNotFound(message) {
    this.throwNewCommonError("TOURNAMENT_NOT_FOUND" /* TOURNAMENT_NOT_FOUND */, message);
  }
  exceptionSameContext() {
    this.throwNewCommonError(
      "SAME_CONTEXT" /* SAME_CONTEXT */,
      "Must specify a context other than the current one."
    );
  }
  exceptionInvalidOperation(message) {
    this.throwNewCommonError("INVALID_OPERATION" /* INVALID_OPERATION */, message);
  }
  exceptionNetworkFailure(message = "Request failed to be processed") {
    this.throwNewCommonError("NETWORK_FAILURE" /* NETWORK_FAILURE */, message);
  }
  exceptionUnknown(message) {
    this.throwNewCommonError("UNKNOWN" /* UNKNOWN */, message);
  }
  exceptionClientUnsupportedOperation(message) {
    this.throwNewCommonError("CLIENT_UNSUPPORTED_OPERATION" /* CLIENT_UNSUPPORTED_OPERATION */, message);
  }
  exceptionRateLimited(message) {
    this.throwNewCommonError("RATE_LIMITED" /* RATE_LIMITED */, message);
  }
};
__name(_Extra, "Extra");
var Extra = _Extra;
var Extra_default = Extra;

// src/game-sdk/sdk/Player.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var GameName = "Tile Connect Remaster".replace(/ /g, "-");
var _Player = class _Player {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "extra");
    __publicField(this, "defaultPlayerInfo");
    __publicField(this, "currentPlayerInfo");
    __publicField(this, "infoKey", GameName + "_PlayerInfo");
    __publicField(this, "dataKey", GameName + "_PlayerData");
    __publicField(this, "subscribeBot", null);
    __publicField(this, "connectedPlayers", null);
    __publicField(this, "getSignature", /* @__PURE__ */ __name(() => {
      const token = this.getSignatureFormMockup();
      if (GameCore.Utils.Valid.isString(token)) return token;
      return "default_token";
    }, "getSignature"));
    this.adapter = adapter;
    this.extra = adapter.extra;
    this.initDefaultPlayerInfo();
  }
  initDefaultPlayerInfo() {
    const playerId = "guest-007";
    this.defaultPlayerInfo = {
      playerId,
      playerName: "Guest",
      playerPhoto: `https://picsum.photos/seed/${playerId}/300/300`
    };
    this.currentPlayerInfo = { ...this.defaultPlayerInfo };
  }
  initPlayerInfo(playerId) {
    this.updateCurrentPlayerInfo(playerId);
    GameCore.Utils.Browser.writeLocalStorage(this.infoKey, this.currentPlayerInfo);
  }
  async canSubscribeBotAsync() {
    await this.loadMockSubscribeBot();
    if (!this.subscribeBot) {
      this.extra.exceptionUnsupported();
    }
    return this.subscribeBot.canSubscribeBotAsync();
  }
  async subscribeBotAsync() {
    await this.loadMockSubscribeBot();
    if (!this.subscribeBot) {
      this.extra.exceptionUnsupported();
    }
    return this.subscribeBot.subscribeBotAsync();
  }
  getID() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerId } = this.currentPlayerInfo;
    if (!Valid.isObject(data)) return playerId;
    if (O.hasOwn(data, "playerId") && Valid.isString(data.playerId)) {
      return data.playerId;
    }
    return playerId;
  }
  getName() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerName } = this.currentPlayerInfo;
    if (!Valid.isObject(data)) return playerName;
    if (O.hasOwn(data, "name") && Valid.isString(data.name)) {
      return data.name;
    }
    return playerName;
  }
  getPhoto() {
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.infoKey);
    const { playerPhoto } = this.currentPlayerInfo;
    if (!Valid.isObject(data)) return playerPhoto;
    if (O.hasOwn(data, "photo") && Valid.isString(data.photo)) {
      return data.photo;
    }
    return playerPhoto;
  }
  async getDataAsync(keys) {
    await this.extra.delayPlayerDataAsync();
    const { Browser, Valid, Object: O } = GameCore.Utils;
    const data = Browser.getLocalStorage(this.dataKey);
    if (!Valid.isObject(data)) return {};
    if (keys.length === 0) return data;
    const dataObject = {};
    keys.forEach((key) => {
      if (O.hasOwn(data, key)) {
        dataObject[key] = data[key];
      }
    });
    return dataObject;
  }
  async setDataAsync(data) {
    await this.extra.delayPlayerDataAsync();
    GameCore.Utils.Browser.writeLocalStorage(this.dataKey, data);
  }
  async getSignedPlayerInfoAsync() {
    return {
      getPlayerID: /* @__PURE__ */ __name(() => {
        return this.getID() ?? "";
      }, "getPlayerID"),
      getSignature: this.getSignature
    };
  }
  async getConnectedPlayersAsync() {
    await this.loadMockConnectedPlayers();
    if (!this.connectedPlayers) {
      this.extra.exceptionUnsupported();
    }
    return this.connectedPlayers.getConnectedPlayersAsync();
  }
  updateCurrentPlayerInfo(playerId) {
    if (!playerId) return;
    const { Match } = GameCore.Configs.Mockup;
    const isPlayer = Match.PlayerInfo.Id === playerId;
    const isOpponent = Match.OpponentInfo.Id === playerId;
    if (isPlayer) {
      this.currentPlayerInfo.playerId = Match.PlayerInfo.Id;
      if (Match.PlayerInfo.Name) {
        this.currentPlayerInfo.playerName = Match.PlayerInfo.Name;
      }
      if (Match.PlayerInfo.Photo) {
        this.currentPlayerInfo.playerPhoto = Match.PlayerInfo.Photo;
      }
    }
    if (isOpponent) {
      this.currentPlayerInfo.playerId = Match.OpponentInfo.Id;
      if (Match.OpponentInfo.Name) {
        this.currentPlayerInfo.playerName = Match.OpponentInfo.Name;
      }
      if (Match.OpponentInfo.Photo) {
        this.currentPlayerInfo.playerPhoto = Match.OpponentInfo.Photo;
      }
    }
  }
  getSignatureFormMockup() {
    const { Match } = GameCore.Configs.Mockup;
    const isPlayer = Match.PlayerInfo.Id === this.getID();
    const isOpponent = Match.OpponentInfo.Id === this.getID();
    if (isPlayer) return Match.PlayerInfo.Signature;
    if (isOpponent) return Match.OpponentInfo.Signature;
    return null;
  }
  async loadMockSubscribeBot() {
    if (this.subscribeBot) return;
    const MockSubscribeBot = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof MockSubscribeBot !== "function") return;
    this.subscribeBot = new MockSubscribeBot(this.adapter);
  }
  async loadMockConnectedPlayers() {
    if (this.connectedPlayers) return;
    const MockConnectedPlayers = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof MockConnectedPlayers !== "function") return;
    this.connectedPlayers = new MockConnectedPlayers(this.extra);
  }
};
__name(_Player, "Player");
var Player = _Player;
var Player_default = Player;

// src/game-sdk/sdk/Tournament.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();

// src/game-sdk/sdk/TournamentInstance.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var _TournamentInstance = class _TournamentInstance {
  constructor(id, payload, isPageHosted = false) {
    __publicField(this, "id");
    __publicField(this, "title");
    __publicField(this, "contextId");
    __publicField(this, "payload");
    __publicField(this, "endTime");
    __publicField(this, "tournamentType");
    const { config, data } = payload;
    this.id = id;
    this.title = config.title;
    this.contextId = `0123${this.id}`;
    this.payload = JSON.stringify(data ?? {});
    this.endTime = config.endTime ?? this.defaultEndTime();
    this.tournamentType = isPageHosted ? "PAGE_HOSTED" : "DEFAULT";
  }
  defaultEndTime() {
    return Math.round((Date.now() + 1e3 * 60 * 60 * 24 * 7) / 1e3);
  }
  getID() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getPayload() {
    return this.payload;
  }
  getEndTime() {
    return this.endTime;
  }
  getContextID() {
    return this.contextId;
  }
  getTournamentType() {
    return this.tournamentType;
  }
  // ! Use for process data in mock
  toObject() {
    return {
      id: this.id,
      title: this.title,
      payload: this.payload,
      endTime: this.endTime,
      contextId: this.contextId,
      tournamentType: this.tournamentType
    };
  }
};
__name(_TournamentInstance, "TournamentInstance");
var TournamentInstance = _TournamentInstance;
var TournamentInstance_default = TournamentInstance;

// src/game-sdk/sdk/Tournament.ts
var CommonErrorList = [
  "Unsupported",
  "NetworkFailure",
  "PendingRequest",
  "ClientUnsupportedOperation"
];
var CreateErrorList = [...CommonErrorList, "InvalidParam", "UserInput"];
var JoinErrorList = [...CommonErrorList, "InvalidOperation", "UserInput"];
var ShareErrorList = [...CommonErrorList, "InvalidParam", "UserInput"];
var PostScoreErrorList = [...CommonErrorList, "InvalidParam", "UserInput"];
var GetTournamentsErrorList = [...CommonErrorList, "NetworkFailure"];
var TOURNAMENTS_DATA_MOCK_KEY = "TournamentsDataMockKey";
var TOURNAMENT_LEADERS_MOCK_KEY = "TournamentLeadersMockKey";
var _Tournament = class _Tournament {
  constructor(adapter) {
    __publicField(this, "adapter");
    __publicField(this, "extra");
    __publicField(this, "context");
    __publicField(this, "shareAsyncPopup", null);
    __publicField(this, "createAsyncPopup", null);
    __publicField(this, "processEnterTournament", /* @__PURE__ */ __name(async (tournamentId) => {
      const tournamentData = this.getTournamentData(tournamentId);
      if (!tournamentData) return;
      await this.joinAsync(tournamentId);
    }, "processEnterTournament"));
    __publicField(this, "handleOnYes", /* @__PURE__ */ __name((resolve) => () => {
      this.extra.isPopupShown = false;
      resolve(true);
    }, "handleOnYes"));
    __publicField(this, "handleOnNo", /* @__PURE__ */ __name((reject) => () => {
      this.extra.isPopupShown = false;
      try {
        this.extra.exceptionUserInput("Player closed the context menu");
      } catch (error) {
        reject(error);
      }
    }, "handleOnNo"));
    this.adapter = adapter;
    this.extra = adapter.extra;
    this.context = adapter.context;
  }
  async initTournamentInfoAsync(tournamentId) {
    const { Tournament: Tournament2 } = GameCore.Configs.Mockup.GameSDK;
    if (!Tournament2.Enabled) return;
    await this.createMockTournamentsData();
    if (tournamentId) {
      await this.processEnterTournament(tournamentId);
    }
  }
  /**
   * @deprecated Only for testing
   */
  async createMockTournamentsData() {
    const { Tournament: Tournament2 } = GameCore.Configs.Mockup.GameSDK;
    const { Normal: NumOfNormal, HostPage: NumOfHostPaged } = Tournament2.NumOfTournament;
    if (!Tournament2.Enabled) return;
    const tournamentsData = this.getTournamentsData();
    const allTournaments = Object.values(tournamentsData);
    const tournaments = this.filterExpiredTournaments(allTournaments);
    const currentDefaultTournaments = tournaments.filter(
      (tournament) => tournament.tournamentType === "DEFAULT"
    );
    const currentHostPageTournaments = tournaments.filter(
      (tournament) => tournament.tournamentType === "PAGE_HOSTED"
    );
    const { length: defaultTournamentsLength } = currentDefaultTournaments;
    const { length: hostPageTournamentsLength } = currentHostPageTournaments;
    const remainingDefaultTournaments = NumOfNormal - defaultTournamentsLength;
    const remainingHostPageTournaments = NumOfHostPaged - hostPageTournamentsLength;
    const defaultTournaments = this.createDefaultTournaments(remainingDefaultTournaments);
    const hostPageTournaments = this.createGlobalTournaments(remainingHostPageTournaments);
    await Promise.all([...defaultTournaments, ...hostPageTournaments]);
  }
  filterExpiredTournaments(tournaments) {
    const now = Date.now() / 1e3;
    const validTournaments = tournaments.filter((tournament) => tournament.endTime > now);
    const newTournamentData = {};
    validTournaments.forEach((tournament) => {
      newTournamentData[tournament.id] = tournament;
    });
    this.writeTournamentsData(newTournamentData);
    return validTournaments;
  }
  createDefaultTournaments(length) {
    const { String: S } = GameCore.Utils;
    const { leaderboard } = window.game;
    const playerId = GameSDK.player.getID();
    const playerName = GameSDK.player.getName();
    return Array.from({ length }, async () => {
      const title = `${playerName}'s Tournament ${S.generateObjectId()}`;
      const { ExtraPlayerTournamentPayload = {} } = GameCore.Configs.Mockup.GameSDK.Tournament;
      const leaderboardId = await leaderboard.createLeaderboardAsync({
        name: title
      });
      const tournament = this.createMockTournamentAsync({
        initialScore: 0,
        config: {
          title,
          tournamentTitle: title
        },
        data: {
          playerId,
          leaderboardId,
          ...ExtraPlayerTournamentPayload
        }
      });
      const tournamentId = tournament.getID().toString();
      if (this.getTournamentLeadersData(tournamentId)) return;
      const playerLimit = GameCore.Utils.Number.random(2);
      const connectedPlayerIds = window.game.player.getConnectedPlayerIds(playerLimit, 0);
      const leaders = connectedPlayerIds.map((playerId2) => {
        return {
          playerId: playerId2,
          score: GameCore.Utils.Number.random(4)
        };
      });
      leaders.sort((a, b) => a.score - b.score);
      this.writeTournamentLeadersData(tournamentId, leaders);
    });
  }
  createGlobalTournaments(length) {
    const { String: S } = GameCore.Utils;
    const { leaderboard } = window.game;
    const { ExtraGlobalTournamentPayload = {} } = GameCore.Configs.Mockup.GameSDK.Tournament;
    const playerId = GameSDK.player.getID();
    return Array.from({ length }, async () => {
      const id = S.generateObjectId();
      const payload = {
        playerId,
        leaderboardId: id,
        ...ExtraGlobalTournamentPayload
      };
      const title = `Global Tournament ${id}`;
      await leaderboard.createLeaderboardAsync({
        name: title,
        _id: id,
        type: "world_tournament_leaderboard",
        description: JSON.stringify(payload)
      });
      const tournament = this.createMockTournamentAsync(
        {
          initialScore: 0,
          config: {
            title,
            tournamentTitle: title
          },
          data: payload
        },
        true
      );
      const tournamentId = tournament.getID().toString();
      if (this.getTournamentLeadersData(tournamentId)) return;
      const leaderLength = GameCore.Utils.Number.random(2);
      const leaders = Array.from({ length: leaderLength }, () => {
        return {
          playerId: S.generateObjectId(),
          score: GameCore.Utils.Number.random(4)
        };
      });
      leaders.sort((a, b) => a.score - b.score);
      this.writeTournamentLeadersData(tournamentId, leaders);
    });
  }
  async awaitRandomDelay() {
    const { Mockup } = GameCore.Configs;
    const { RandomDelayMs } = Mockup.GameSDK.Tournament;
    return this.extra.awaitRandomDelay(RandomDelayMs);
  }
  randomError(errors) {
    const { Mockup } = GameCore.Configs;
    const { ErrorRates } = Mockup.GameSDK.Tournament;
    const isError = Math.random() * 100 < ErrorRates;
    if (!isError) return;
    this.extra.randomException(errors);
  }
  async loadCreateTournamentPopupAsync() {
    if (this.createAsyncPopup) return;
    const CreateAsyncPopup = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof CreateAsyncPopup !== "function") return;
    this.createAsyncPopup = new CreateAsyncPopup();
  }
  async loadSharePopupAsync() {
    if (this.shareAsyncPopup) return;
    const ShareAsyncPopup = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof ShareAsyncPopup !== "function") return;
    this.shareAsyncPopup = new ShareAsyncPopup();
  }
  async createAsync(payload) {
    this.extra.checkPopupShown();
    await this.awaitRandomDelay();
    if (this.context.getID() !== null) {
      this.extra.exceptionInvalidOperation("Cannot create tournament while in a context");
    }
    this.validateCreatePayload(payload);
    this.randomError(CreateErrorList);
    await this.loadCreateTournamentPopupAsync();
    await new Promise((resolve, reject) => {
      if (!this.createAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.createAsyncPopup.onYes(this.handleOnYes(resolve));
      this.createAsyncPopup.onNo(this.handleOnNo(reject));
      this.createAsyncPopup.show(payload);
      this.extra.isPopupShown = true;
    });
    const tournament = this.createMockTournamentAsync(payload);
    const contextId = tournament.getContextID();
    this.setCurrentContextID(contextId);
    return tournament;
  }
  createMockTournamentAsync(payload, isPageHosted = false) {
    const id = GameCore.Utils.String.generateObjectId();
    const tournament = new TournamentInstance_default(id, payload, isPageHosted);
    const tournamentData = tournament.toObject();
    this.writeTournamentData(id, tournamentData);
    return tournament;
  }
  async postScoreAsync(score) {
    await this.awaitRandomDelay();
    this.validateAvailableTournament();
    if (!Number.isSafeInteger(score)) {
      this.extra.exceptionInvalidParam("Score must be an safe integer");
    }
    this.randomError(PostScoreErrorList);
    const playerId = window.game.player.getPlayerId();
    this.updateBestScore(playerId, score);
  }
  // ? shareAsync always show if score is less than best score
  async shareAsync(payload) {
    this.extra.checkPopupShown();
    await this.awaitRandomDelay();
    this.validateAvailableTournament();
    this.validateSharePayload(payload);
    this.randomError(ShareErrorList);
    await this.loadSharePopupAsync();
    const { score } = payload;
    let bestScore = score;
    const tournament = this.getCurrentTournament();
    if (tournament) {
      const playerId2 = window.game.player.getPlayerId();
      const tournamentId = tournament.getID().toString();
      const lastBestScore = this.getBestScore(tournamentId, playerId2);
      if (lastBestScore && lastBestScore < score) {
        bestScore = lastBestScore;
      }
    }
    await new Promise((resolve, reject) => {
      if (!this.shareAsyncPopup) {
        this.adapter.extra.exceptionUnsupported();
      }
      this.shareAsyncPopup.onYes(this.handleOnYes(resolve));
      this.shareAsyncPopup.onNo(this.handleOnNo(reject));
      this.shareAsyncPopup.show(bestScore);
      this.extra.isPopupShown = true;
    });
    const playerId = window.game.player.getPlayerId();
    this.updateBestScore(playerId, score);
  }
  async getTournamentsAsync() {
    await this.awaitRandomDelay();
    this.randomError(GetTournamentsErrorList);
    const tournamentsData = this.getTournamentsData();
    const tournaments = Object.values(tournamentsData);
    const tournamentInstances = tournaments.map(
      (tournament) => this.getTournamentInstance(tournament.id)
    );
    return tournamentInstances.filter(
      (tournament) => tournament !== null
    );
  }
  async joinAsync(tournamentId) {
    await this.awaitRandomDelay();
    if (!GameCore.Utils.Valid.isString(tournamentId)) {
      this.extra.exceptionInvalidParam("Tournament ID must be a string");
    }
    const tournament = this.getTournamentInstance(tournamentId);
    if (!tournament) {
      this.extra.exceptionTournamentNotFound("Tournament could not be found.");
    }
    this.randomError(JoinErrorList);
    const tournamentContextId = tournament.getContextID();
    await GameSDK.context.switchAsync(tournamentContextId);
  }
  setCurrentContextID(contextId) {
    if (this.context instanceof Context_default) {
      this.context.setCurrentContextId(contextId);
    }
  }
  getCurrentTournament() {
    const contextId = this.context.getID();
    if (!contextId) return null;
    const tournamentsData = this.getTournamentsData();
    for (const tournamentId in tournamentsData) {
      if (Object.hasOwn(tournamentsData, tournamentId)) {
        const tournament = tournamentsData[tournamentId];
        if (tournament.contextId === contextId) {
          return this.getTournamentInstance(tournamentId);
        }
      }
    }
    return null;
  }
  validateCreatePayload(payload) {
    const { Object: O, Valid: V } = GameCore.Utils;
    if (!V.isObject(payload)) {
      this.extra.exceptionInvalidParam("Payload must be an object");
    }
    if (!O.hasOwn(payload, "initialScore")) {
      this.extra.exceptionInvalidParam("Payload must have initialScore");
    }
    if (!O.hasOwn(payload, "config")) {
      this.extra.exceptionInvalidParam("Payload must have config");
    }
    const { initialScore, config } = payload;
    if (!V.isNumber(initialScore)) {
      this.extra.exceptionInvalidParam("initialScore must be a number");
    }
    if (!V.isObject(config)) {
      this.extra.exceptionInvalidParam("Config must be an object");
    }
    if (!O.hasOwn(config, "title")) {
      this.extra.exceptionInvalidParam("Config must have title");
    }
    if (!O.hasOwn(config, "tournamentTitle")) {
      this.extra.exceptionInvalidParam("Config must have tournamentTitle");
    }
    if (O.hasOwn(payload, "data") && !V.isObject(payload.data)) {
      this.extra.exceptionInvalidParam("Data must be an object");
    }
  }
  validateSharePayload(payload) {
    const { Object: O, Valid: V } = GameCore.Utils;
    if (!V.isObject(payload)) {
      this.extra.exceptionInvalidParam("Payload must be an object");
    }
    if (!O.hasOwn(payload, "score")) {
      this.extra.exceptionInvalidParam("Payload must have score");
    }
    const { score } = payload;
    if (!V.isNumber(score)) {
      this.extra.exceptionInvalidParam("Score must be a number");
    }
    if (O.hasOwn(payload, "data") && !V.isObject(payload.data)) {
      this.extra.exceptionInvalidParam("Data must be an object");
    }
  }
  validateAvailableTournament() {
    const tournament = this.getCurrentTournament();
    if (tournament) return;
    this.extra.exceptionTournamentNotFound("There is no tournament for this context.");
  }
  getTournamentInstance(id) {
    const tournamentData = this.getTournamentData(id);
    if (!tournamentData) return null;
    return {
      getID: /* @__PURE__ */ __name(() => tournamentData.id, "getID"),
      getTitle: /* @__PURE__ */ __name(() => tournamentData.title, "getTitle"),
      getPayload: /* @__PURE__ */ __name(() => tournamentData.payload, "getPayload"),
      getEndTime: /* @__PURE__ */ __name(() => tournamentData.endTime, "getEndTime"),
      getContextID: /* @__PURE__ */ __name(() => tournamentData.contextId, "getContextID"),
      getTournamentType: /* @__PURE__ */ __name(() => tournamentData.tournamentType, "getTournamentType")
    };
  }
  getTournamentData(id) {
    const tournaments = this.getTournamentsData();
    if (!tournaments[id]) return null;
    return tournaments[id];
  }
  writeTournamentData(id, data) {
    const tournaments = this.getTournamentsData();
    tournaments[id] = data;
    this.writeTournamentsData(tournaments);
  }
  getTournamentsData() {
    const { Browser: B, Valid: V } = GameCore.Utils;
    const data = B.getLocalStorage(TOURNAMENTS_DATA_MOCK_KEY);
    if (!V.isObject(data)) return {};
    return data;
  }
  writeTournamentsData(tournaments) {
    const { Browser: B, Valid: V } = GameCore.Utils;
    if (!V.isObject(tournaments)) return;
    B.writeLocalStorage(TOURNAMENTS_DATA_MOCK_KEY, tournaments);
  }
  getBestScore(tournamentId, playerId) {
    const leader = this.getTournamentLeader(tournamentId, playerId);
    if (!leader) return null;
    return leader.score ?? null;
  }
  updateBestScore(playerId, score) {
    const tournament = this.getCurrentTournament();
    if (!tournament) return;
    const tournamentId = tournament.getID().toString();
    if (!tournamentId) return;
    const leader = this.getTournamentLeader(tournamentId, playerId);
    if (!leader) {
      this.writeTournamentLeader(tournamentId, {
        playerId,
        score
      });
      return;
    }
    if (leader.score < score) {
      leader.score = score;
      this.writeTournamentLeader(tournamentId, leader);
    }
  }
  getTournamentLeader(tournamentId, playerId) {
    const tournamentLeaders = this.getTournamentLeadersData(tournamentId);
    if (!tournamentLeaders.length) return null;
    return tournamentLeaders.find((leader) => leader.playerId === playerId) ?? null;
  }
  getTournamentLeadersData(tournamentId) {
    const { Browser: B, Object: O } = GameCore.Utils;
    const data = B.getLocalStorage(TOURNAMENT_LEADERS_MOCK_KEY);
    if (!O.hasOwn(data, tournamentId)) return [];
    const tournamentLeaders = data[tournamentId];
    if (!Array.isArray(tournamentLeaders)) return [];
    tournamentLeaders.sort((a, b) => b.score - a.score);
    return tournamentLeaders;
  }
  writeTournamentLeader(tournamentId, leader) {
    const tournamentLeaders = this.getTournamentLeadersData(tournamentId);
    const leaderIndex = tournamentLeaders.findIndex(
      (tournamentLeader) => tournamentLeader.playerId === leader.playerId
    );
    if (leaderIndex === -1) {
      tournamentLeaders.push(leader);
    } else {
      tournamentLeaders[leaderIndex] = leader;
    }
    this.writeTournamentLeadersData(tournamentId, tournamentLeaders);
  }
  writeTournamentLeadersData(tournamentId, tournamentLeaders) {
    const { Browser: B } = GameCore.Utils;
    if (!Array.isArray(tournamentLeaders)) return;
    const data = B.getLocalStorage(TOURNAMENT_LEADERS_MOCK_KEY) ?? {};
    Object.assign(data, { [tournamentId]: tournamentLeaders });
    B.writeLocalStorage(TOURNAMENT_LEADERS_MOCK_KEY, data);
  }
};
__name(_Tournament, "Tournament");
var Tournament = _Tournament;
var Tournament_default = Tournament;

// src/game-sdk/sdk/GameSDK.ts
var _GameSDK = class _GameSDK {
  constructor() {
    __publicField(this, "extra");
    __publicField(this, "player");
    __publicField(this, "context");
    __publicField(this, "tournament");
    __publicField(this, "shortcut", null);
    __publicField(this, "isInitialized", false);
    __publicField(this, "bannerAdInstances", {});
    __publicField(this, "rewardedVideoInstance", null);
    __publicField(this, "interstitialAdInstance", null);
  }
  initialize() {
    this.extra = new Extra_default(this);
    this.player = new Player_default(this);
    this.context = new Context_default(this);
    this.tournament = new Tournament_default(this);
  }
  getLocale() {
    return GameCore.Utils.Browser.getLocale();
  }
  getPlatform() {
    const { Device } = GameCore.Utils;
    if (Device.isAndroid()) return "ANDROID";
    if (Device.isIOS()) return "IOS";
    if (Device.isDesktop()) return "WEB";
    if (Device.isMobile()) return "MOBILE_WEB";
    return null;
  }
  getSDKName() {
    return "GameCore";
  }
  getSDKVersion() {
    return "1.0.0";
  }
  async initializeAsync() {
    if (this.isInitialized) return;
    this.initialize();
    this.extra.createLoadingElement();
    await this.extra.waitGameCoreReadyAsync();
    await this.extra.delayInitialAsync();
    const params = GameCore.Utils.Browser.getQueryParams();
    console.info("GameCore params:", params);
    const splashPreview = params["splashPreview"];
    if (splashPreview) {
      this.extra.destroyLoadingElement();
      return;
    }
    const playerIdInQuery = params["playerId"];
    this.player.initPlayerInfo(playerIdInQuery);
    const contextIdInQuery = params["context_source_id"];
    const contextTypeInQuery = params["context_type"];
    this.context.initContextInfo(contextIdInQuery, contextTypeInQuery);
    this.isInitialized = true;
  }
  async startGameAsync() {
    await this.extra.delayStartAsync();
    const initedPercent = 90;
    window.__sdkLoadingCount = initedPercent;
    this.setLoadingProgress(initedPercent);
    this.extra.destroyLoadingElement();
    const params = GameCore.Utils.Browser.getQueryParams();
    const tournamentIdInQuery = params["tournament_id"];
    await this.tournament.initTournamentInfoAsync(tournamentIdInQuery);
    window.game.event.emit(GameCore.Events.GAME_SDK_STARTED);
  }
  setLoadingProgress(percentage) {
    this.extra.setLoadingElementProgress(percentage);
  }
  getEntryPointData() {
    return {};
  }
  async getEntryPointAsync() {
    return "no_entry";
  }
  async loadBannerAdAsync(placementId) {
    if (!placementId) return;
    if (!this.bannerAdInstances[placementId]) {
      const MockBannerInstance = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
      if (typeof MockBannerInstance !== "function") {
        this.extra.exceptionInvalidOperation("Banner ads mock is not enabled");
      }
      this.bannerAdInstances[placementId] = new MockBannerInstance("banner", placementId);
    }
    await this.bannerAdInstances[placementId].loadAsync();
    await this.bannerAdInstances[placementId].showAsync();
  }
  async hideBannerAdAsync(placementId) {
    if (!this.bannerAdInstances[placementId]) return;
    await this.bannerAdInstances[placementId].hideAsync();
  }
  getBannerHeight(bannerConfig) {
    return bannerConfig.BannerHeight;
  }
  async getInterstitialAdAsync(placementId) {
    if (!this.interstitialAdInstance) {
      const MockAdInstance = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
      if (typeof MockAdInstance !== "function") {
        this.extra.exceptionInvalidOperation("Interstitial ads mock is not enabled");
      }
      this.interstitialAdInstance = new MockAdInstance("interstitial", placementId);
    }
    return this.interstitialAdInstance;
  }
  async getRewardedVideoAsync(placementId) {
    if (!this.rewardedVideoInstance) {
      const MockAdInstance = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
      if (typeof MockAdInstance !== "function") {
        this.extra.exceptionInvalidOperation("Rewarded video ads mock is not enabled");
      }
      this.rewardedVideoInstance = new MockAdInstance("rewarded", placementId);
    }
    return this.rewardedVideoInstance;
  }
  async getTournamentAsync() {
    this.tournament.randomError(["Unsupported", "NetworkFailure"]);
    const currentContextID = this.context.getID();
    if (!GameCore.Utils.Valid.isString(currentContextID)) {
      this.extra.exceptionInvalidOperation("Not in a context");
    }
    const tournaments = await this.tournament.getTournamentsAsync();
    const wantedTournament = tournaments.find((tournament) => {
      return tournament.getContextID() === currentContextID;
    });
    if (!wantedTournament) {
      this.extra.exceptionTournamentNotFound(
        "A Tournament with current context was not found"
      );
    }
    return wantedTournament;
  }
  getSupportedAPIs() {
    const { CanSubscribeBot } = GameCore.Configs.Mockup.GameSDK.Player.SubscribeBot;
    if (CanSubscribeBot) {
      return ["player.canSubscribeBotAsync"];
    }
    return [];
  }
  async canCreateShortcutAsync() {
    await this.loadMockAddShortcut();
    if (!this.shortcut) {
      this.extra.exceptionUnsupported();
    }
    return this.shortcut.canCreateShortcutAsync();
  }
  async createShortcutAsync() {
    await this.loadMockAddShortcut();
    if (!this.shortcut) {
      this.extra.exceptionUnsupported();
    }
    return this.shortcut.createShortcutAsync();
  }
  async loadMockAddShortcut() {
    if (this.shortcut) return;
    const MockAddShortcut = (await Promise.resolve().then(() => (init_empty_script(), empty_script_exports))).default;
    if (typeof MockAddShortcut !== "function") return;
    this.shortcut = new MockAddShortcut(this);
  }
};
__name(_GameSDK, "GameSDK");
var GameSDK2 = _GameSDK;
var GameSDK_default = GameSDK2;

// src/game-sdk/adapters/msgames/MSAdInstance.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();

// src/game-sdk/sdk/AdInstance.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var _AdInstance = class _AdInstance {
  constructor(type, placementId) {
    __publicField(this, "type");
    __publicField(this, "placementId");
    this.type = type;
    this.placementId = placementId;
  }
  getPlacementID() {
    return this.placementId;
  }
  async hideAsync() {
    return Promise.resolve();
  }
};
__name(_AdInstance, "AdInstance");
var AdInstance = _AdInstance;
var AdInstance_default = AdInstance;

// src/game-sdk/adapters/msgames/MSAdInstance.ts
var defaultRespond = {
  instanceId: ""
};
var _MSAdInstance = class _MSAdInstance extends AdInstance_default {
  constructor(type, sdk) {
    super(type, "");
    __publicField(this, "sdk");
    __publicField(this, "type");
    __publicField(this, "response");
    this.sdk = sdk;
    this.type = type;
    this.response = defaultRespond;
  }
  getPlacementID() {
    return this.response.instanceId;
  }
  loadAsync() {
    return new Promise((resolve, reject) => {
      const isRewarded = this.type === "rewarded";
      this.sdk.loadAdsAsync({
        isRewardedAd: isRewarded,
        canBackfill: true
      }).then((instance) => {
        this.response = instance;
        resolve();
      }).catch((error) => {
        if (this.isAdsAlreadyLoadedError(error)) {
          resolve();
          return;
        }
        reject(error);
      });
    });
  }
  isAdsAlreadyLoadedError(error) {
    let errorAsString = "";
    try {
      errorAsString = JSON.stringify(error);
    } catch (error2) {
      return false;
    }
    const isClientError = errorAsString.includes("LOAD_ADS_CLIENT_FAILURE");
    const isAlreadyLoadedError = errorAsString.includes("Ads already loaded.");
    return isClientError && isAlreadyLoadedError;
  }
  async showAsync() {
    return new Promise((resolve, reject) => {
      if (!this.response.instanceId) {
        reject(new Error("Ad is not loaded. InstanceId is empty"));
      }
      this.sdk.showAdsAsync(this.response.instanceId).then((instance) => {
        if (!instance.showAdsCompletedAsync) {
          reject(new Error("Ad is not loaded. showAdsCompletedAsync is empty"));
          return;
        }
        instance.showAdsCompletedAsync.then(() => {
          this.response = defaultRespond;
          resolve();
        }).catch((error) => {
          if (error.code && error.code === "SHOW_ADS_COMPLETED_FAILURE") {
            error.code = "USER_INPUT";
          }
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
__name(_MSAdInstance, "MSAdInstance");
var MSAdInstance = _MSAdInstance;
var MSAdInstance_default = MSAdInstance;

// src/game-sdk/adapters/msgames/MSExtra.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var GameName2 = "Tile Connect Remaster".replace(/ /g, "-");
var _MSExtra = class _MSExtra extends Extra_default {
  constructor(adapter) {
    super(adapter);
    __publicField(this, "sdk");
    __publicField(this, "shareImageBase64");
    __publicField(this, "notificationImageBase64");
    this.sdk = adapter.sdk;
    this.adapter = adapter;
  }
  async shareAsync() {
    try {
      if (!this.shareImageBase64) {
        const { loadImage } = GameCore.Utils.Image;
        const img = await loadImage("./assets/images/others/share.jpg");
        if (img) {
          this.shareImageBase64 = img.src;
        }
      }
      await this.sdk.shareAsync({
        title: GameName2,
        text: "Play now!",
        image: this.shareImageBase64
      });
    } catch (error) {
      console.warn("shareAsync", error);
    }
  }
  switchGameAsync(appId, data) {
    const { isObject } = GameCore.Utils.Valid;
    if (!isObject(data)) {
      return this.exceptionInvalidParam(`Data must be an object, but got ${typeof data}`);
    }
    return this.sdk.switchGameAsync({
      id: appId,
      payloadData: data
    });
  }
  submitGameResultsAsync(score) {
    return this.sdk.submitGameResultsAsync(score);
  }
  async scheduleNotificationAsync(data) {
    if (!this.notificationImageBase64) {
      try {
        const { loadImage } = GameCore.Utils.Image;
        const img = await loadImage("./assets/images/others/notification.jpg");
        if (img) {
          this.notificationImageBase64 = img.src;
        }
      } catch (error) {
        console.warn("scheduleNotificationAsync > notificationImageBase64", error);
      }
    }
    let defaultData = {
      title: GameName2,
      description: "We miss you!",
      type: 0,
      minDelayInSeconds: 3.6,
      imageData: this.notificationImageBase64,
      callToAction: "Play now!"
    };
    defaultData = { ...defaultData, ...data };
    console.info("scheduleNotificationAsync");
    try {
      await this.sdk.scheduleNotificationAsync(defaultData);
    } catch (error) {
      console.warn("scheduleNotificationAsync", error);
    }
  }
  isValidDisplayAdPlacement(placement) {
    const listSupports = [
      "top:728x90",
      "bottom:728x90",
      "left:300x250",
      "right:300x250",
      "topleft:300x250",
      "topright:300x250",
      "bottomleft:300x250",
      "bottomright:300x250",
      "top:320x50",
      "right:320x50",
      "bottom:320x50",
      "left:320x50",
      "left:300x600",
      "right:300x600",
      "top:970x250",
      "bottom:970x250",
      "left:160x600",
      "right:160x600"
    ];
    if (listSupports.includes(placement)) {
      return true;
    }
    return false;
  }
};
__name(_MSExtra, "MSExtra");
var MSExtra = _MSExtra;
var MSExtra_default = MSExtra;

// src/game-sdk/adapters/msgames/MSPlayer.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var _MSPlayer = class _MSPlayer extends Player_default {
  constructor(adapter) {
    super(adapter);
    __publicField(this, "_personalInfo");
    __publicField(this, "signature", "");
    __publicField(this, "isLoginEnabled", false);
    this.updateLoginEnabledConfig();
  }
  updateLoginEnabledConfig() {
    const gameConfig = define_GAME_SDK_CONFIG_default;
    if (!gameConfig) return;
    const { MSGames } = gameConfig;
    if (!MSGames) return;
    this.isLoginEnabled = MSGames.UseLoginFeature;
  }
  async initPlayerAsync() {
    try {
      let user = await this.tryGettingSignedInPlayer();
      if (this.isLoginEnabled && !user) {
        user = await this.tryMakingPlayerSignedIn();
      }
      if (user) {
        await this.initLoggedMode(user);
      } else {
        await this.initGuestMode();
      }
    } catch (e) {
      await this.initGuestMode();
    }
  }
  async updateCurrentPlayerInfo(playerId) {
    const { Valid, Number: N } = GameCore.Utils;
    let currentId = this.getID();
    if (!Valid.isString(currentId) || !Valid.isString(playerId)) {
      currentId = `${N.random(1e5)}`;
    }
    this.currentPlayerInfo.playerId = currentId;
    this.currentPlayerInfo.playerName = `Guest_${currentId}`;
  }
  async initLoggedMode(user) {
    const { playerId, signature, playerDisplayName } = user;
    this.currentPlayerInfo.playerId = playerId;
    this.currentPlayerInfo.playerName = playerDisplayName;
    this.signature = `${playerId} ${signature}`;
    this._personalInfo = {
      id: playerId,
      avatarIdHash: "0",
      lang: "en",
      publicName: playerDisplayName,
      uniqueID: playerId,
      scopePermissions: {
        avatar: "forbid",
        public_name: "forbid"
      }
    };
    this.initPlayerInfo(playerId);
  }
  async initGuestMode() {
    try {
      const playerName = await this.getRandomName();
      const playerId = playerName.replace(/ /g, "-");
      if (playerId === this.getID()) return;
      this.currentPlayerInfo.playerId = playerId;
      this.currentPlayerInfo.playerName = playerName;
      this._personalInfo = {
        id: playerId,
        avatarIdHash: "0",
        lang: "en",
        publicName: playerName,
        uniqueID: playerId,
        scopePermissions: {
          avatar: "forbid",
          public_name: "forbid"
        }
      };
      this.initPlayerInfo(playerId);
    } catch (_) {
    }
  }
  async getRandomName() {
    return GameCore.Utils.String.generateNameAsync();
  }
  async tryGettingSignedInPlayer() {
    let user = null;
    const { sdk } = this.adapter;
    try {
      user = await sdk.getSignedInUserAsync();
    } catch (error) {
      console.warn("tryGettingSignedInPlayer", error);
    }
    return Promise.resolve(user);
  }
  async tryMakingPlayerSignedIn() {
    let user = null;
    const { sdk } = this.adapter;
    try {
      user = await sdk.signInAsync();
    } catch (error) {
      console.warn("tryMakingPlayerSignedIn", error);
    }
    return Promise.resolve(user);
  }
  getSignedASIDAsync() {
    return Promise.resolve({
      getASID: /* @__PURE__ */ __name(() => {
        return this.getID() ?? "";
      }, "getASID"),
      getSignature: /* @__PURE__ */ __name(() => {
        return this.signature;
      }, "getSignature")
    });
  }
  getSignedPlayerInfoAsync() {
    return Promise.resolve({
      getPlayerID: /* @__PURE__ */ __name(() => {
        return this.getID() ?? "10";
      }, "getPlayerID"),
      getSignature: /* @__PURE__ */ __name(() => {
        return this.signature;
      }, "getSignature")
    });
  }
  canSubscribeBotAsync() {
    return Promise.resolve(false);
  }
  subscribeBotAsync() {
    this.adapter.extra.exceptionUnsupported();
  }
  getConnectedPlayersAsync() {
    this.adapter.extra.exceptionUnsupported();
  }
};
__name(_MSPlayer, "MSPlayer");
var MSPlayer = _MSPlayer;
var MSPlayer_default = MSPlayer;

// src/game-sdk/adapters/msgames/MSAdapter.ts
var _MSAdapter = class _MSAdapter extends GameSDK_default {
  constructor(sdk) {
    super();
    __publicField(this, "sdk");
    this.sdk = sdk;
  }
  initialize() {
    super.initialize();
    this.extra = new MSExtra_default(this);
    this.player = new MSPlayer_default(this);
    this.rewardedVideoInstance = new MSAdInstance_default("rewarded", this.sdk);
    this.interstitialAdInstance = new MSAdInstance_default("interstitial", this.sdk);
  }
  async initializeAsync() {
    if (this.isInitialized) return;
    await super.initializeAsync();
    this.isInitialized = false;
    try {
      await this.player.initPlayerAsync();
      this.isInitialized = true;
    } catch (error) {
      console.warn("Microsoft Games SDK not initialized, running without platform sdk");
    }
  }
  getLocale() {
    return this.sdk.getLocale();
  }
  getSDKVersion() {
    return "v1.0.0-rc.13";
  }
  getSDKName() {
    return "MsGames";
  }
  async canCreateShortcutAsync() {
    return true;
  }
  async createShortcutAsync() {
    try {
      await this.sdk.promptInstallAsync();
    } catch (error) {
      console.warn("createShortcutAsync", error);
    }
  }
  async getInterstitialAdAsync() {
    return this.interstitialAdInstance;
  }
  async getRewardedVideoAsync() {
    return this.rewardedVideoInstance;
  }
  async loadBannerAdAsync(placementId) {
    const { BannerDisplayAdOptions } = GameCore.Configs.Ads;
    const config = BannerDisplayAdOptions.find((config2) => config2.PlacementId === placementId);
    if (!config) {
      this.extra.exceptionInvalidOperation("Banner ad config not found.");
    }
    const { Position, BannerWidth, BannerHeight } = config;
    if (!Position || !BannerWidth || !BannerHeight) {
      this.extra.exceptionInvalidOperation("Invalid banner ad config.");
    }
    const placement = `${Position}:${BannerWidth}x${BannerHeight}`;
    if (!this.extra.isValidDisplayAdPlacement(placement)) {
      this.extra.exceptionInvalidParam("placementId");
    } else {
      await this.sdk.showDisplayAdsAsync(placement);
    }
  }
  async hideBannerAdAsync(_placementId) {
    try {
      await this.sdk.hideDisplayAdsAsync();
    } catch (error) {
      console.warn("\u{1F680} > hideBannerAdAsync", error);
    }
  }
  async getEntryPointAsync() {
    const entryPointInfo = this.sdk.getEntryPointInfo();
    return entryPointInfo.entryPointId;
  }
};
__name(_MSAdapter, "MSAdapter");
var MSAdapter = _MSAdapter;
var MSAdapter_default = MSAdapter;

// src/game-sdk/index.ts
init_empty_script();

// src/utils/function/security.ts
init_define_GAME_SDK_CONFIG();
init_define_INIT_CONFIG();
var usedCallLocations = [];
var blockAccess = /* @__PURE__ */ __name((source) => {
  try {
    const error = new Error();
    if (error.stack == null) {
      throw new Error();
    }
    const stackLines = error.stack.split("\n");
    const stackLineCount = stackLines.length;
    const callerLine = stackLineCount >= 4 ? stackLines[3] : stackLines[0];
    if (!callerLine) return source;
    if (usedCallLocations.includes(callerLine)) {
      return source;
    }
    console.warn("Access:", callerLine);
    if (["eval", "at <", "(<"].some((keyword) => callerLine.includes(keyword))) {
      throw new Error();
    }
    usedCallLocations.push(callerLine);
    return source;
  } catch (error) {
    console.warn("Block access:", error);
    return void 0;
  }
}, "blockAccess");
var wrapGetterToBlockObjectAccess = /* @__PURE__ */ __name((source, key) => {
  if (true) return;
  if (false) return;
  const originalValue = Object.getOwnPropertyDescriptor(source, key)?.value;
  if (!originalValue) return;
  Object.defineProperty(source, key, {
    enumerable: false,
    get() {
      return blockAccess(originalValue);
    },
    set() {
      return;
    }
  });
}, "wrapGetterToBlockObjectAccess");
var security_default = wrapGetterToBlockObjectAccess;

// src/game-sdk/index.ts
console.groupCollapsed("\u26A1\uFE0F Corecos initialized");
function autoDetectAndInitializeSDKAdapter() {
  let sdkAdapter;
  const w = window;
  let sdkName = "GameSDK";
  if ("FBInstant" in w) {
    sdkName = "FBInstant";
    sdkAdapter = new empty_script_default(window.FBInstant);
  } else if ("YaGames" in w) {
    sdkName = "Yandex";
    sdkAdapter = new empty_script_default(window.YaGames);
  } else if ("$msstart" in w) {
    sdkName = "MsGames";
    sdkAdapter = new MSAdapter_default(window.$msstart);
  } else if ("gdsdk" in w) {
    sdkName = "GameDistribution";
    sdkAdapter = new empty_script_default(window.gdsdk);
  } else if ("CrazyGames" in w) {
    sdkName = "CrazyGames";
    sdkAdapter = new empty_script_default(window.CrazyGames.SDK);
  } else if ("GlanceGamingAdInterface" in w) {
    sdkName = "Glance";
    sdkAdapter = new empty_script_default(window.GlanceGamingAdInterface);
  } else if (false) {
    sdkName = "AndroidNative";
    sdkAdapter = new ANAdapter();
  } else {
    sdkAdapter = new GameSDK_default();
  }
  console.info(`GameSDK loaded (${sdkName})`);
  return sdkAdapter;
}
__name(autoDetectAndInitializeSDKAdapter, "autoDetectAndInitializeSDKAdapter");
console.groupCollapsed(`\u{1F579}\uFE0F GameSDK`);
window.GameSDK = Object.seal(autoDetectAndInitializeSDKAdapter());
security_default(window, "GameSDK");
})();(function () {"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// <define:__INIT_CONFIG__>
var define_INIT_CONFIG_default = { BUILD_VERSION: "7", TAGS_TO_CONFIG: ["null"] };

// libs/init-game-sdk.js
var initConfig = define_INIT_CONFIG_default;
var lastProgress = 0;
var stepProgressLoading = /* @__PURE__ */ __name(() => {
  const gameSdkLoadingTimer = setInterval(() => {
    if (window.__sdkLoadingCount >= 99) {
      clearInterval(gameSdkLoadingTimer);
      return;
    }
    if (lastProgress === window.__sdkLoadingCount) return;
    lastProgress = window.__sdkLoadingCount;
    GameSDK.setLoadingProgress(window.__sdkLoadingCount);
  }, 300);
}, "stepProgressLoading");
var initGameSDK = /* @__PURE__ */ __name(async () => {
  console.info("GameSDK initializing...");
  console.groupEnd();
  await GameSDK.initializeAsync();
  window.__sdkLoadingCount = 1;
  GameSDK.setLoadingProgress(window.__sdkLoadingCount);
  if (true) {
    stepProgressLoading();
  } else {
    autoProgressLoading();
  }
  processGoogleAnalytics();
  console.groupEnd();
  console.info("GameSDK initialized");
  window.__sdkInitiated = true;
}, "initGameSDK");
var userProperties = {};
var processGoogleAnalytics = /* @__PURE__ */ __name(() => {
  if (!initConfig) return;
  const { TAGS_TO_CONFIG = [], BUILD_VERSION } = initConfig || {};
  const userId = GameSDK.player.getID();
  initGoogleAnalytics(TAGS_TO_CONFIG, BUILD_VERSION, userId);
  updateUserPropertiesWhenPlayerInfoLoaded(userId);
}, "processGoogleAnalytics");
var initGoogleAnalytics = /* @__PURE__ */ __name((tagIds, buildVer, userId) => {
  try {
    window.focus();
    let entryPoint = "no_entry";
    const { fbig_ad_id, fbig_adset_id, fbig_campaign_id } = GameSDK.getEntryPointData() || {};
    const configs = {
      build_version: buildVer,
      campaign: fbig_campaign_id,
      campaign_medium: fbig_campaign_id
    };
    userProperties.user_id = userId;
    userProperties.app_version = buildVer;
    userProperties.ad_id = fbig_ad_id;
    userProperties.adset_id = fbig_adset_id;
    userProperties.campaign_id = fbig_campaign_id;
    GameSDK.getEntryPointAsync().then((entry) => {
      entryPoint = entry;
    }).catch((error) => {
      console.warn("GameSDK initGoogleAnalytics getEntryPointAsync:", error);
    }).finally(() => {
      configs.medium = entryPoint;
      userProperties.traffic_source = entryPoint;
      tagIds.forEach((gaId) => {
        if (!gaId || gaId === "null") return;
        window.gtag("config", gaId, configs);
      });
      window.gtag("set", "user_properties", userProperties);
    });
    tagIds.forEach((gaId) => {
      if (!gaId || gaId === "null") return;
      window.gtag("config", gaId, configs);
    });
    window.gtag("set", "client_id", `100.${userId}`);
    window.gtag("set", "user_properties", userProperties);
    window.gtag("event", "ga_user_init", {
      success: true
    });
  } catch (error) {
    window.gtag("event", "ga_user_init", {
      success: false
    });
    console.warn("GameSDK initGoogleAnalytics:", error);
  } finally {
    window.gtag("event", "app_launch");
  }
}, "initGoogleAnalytics");
var updateUserPropertiesWhenPlayerInfoLoaded = /* @__PURE__ */ __name((userId) => {
  if (!userId || !window.game || !window.game.player) return;
  const isNewUser = window.game.player.isFirstLogin();
  userProperties.new_user = isNewUser;
  window.gtag("set", "user_properties", userProperties);
}, "updateUserPropertiesWhenPlayerInfoLoaded");
initGameSDK();
})();