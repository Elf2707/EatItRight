// @flow
export type FirebaseUserData = {
  additionalUserInfo: {
    profile: ?any,
    username: ?any,
    providerId: string,
    isNewUser: boolean
  },
  user: {
    _auth: {
      _app: {
        _initialized: boolean,
        _nativeInitialized: boolean,
        _name: string,
        _options: {
          apiKey: string,
          messagingSenderId: string,
          storageBucket: string,
          databaseURL: string,
          clientId: string,
          appId: string,
          projectId: string,
        },
        admob: Function,
        analytics: Function,
        auth: Function,
        config: Function,
        crash: Function,
        crashlytics: Function,
        database: Function,
        firestore: Function,
        functions: Function,
        iid: Function,
        invites: Function,
        links: Function,
        messaging: Function,
        notifications: Function,
        perf: Function,
        storage: Function,
        utils: Function,
        _extendedProps: {},
      },
      _serviceUrl: ?any,
      namespace: string,
      _user: any,
      _authResult: boolean,
      _languageCode: ?any
    },
    _user: {
      metadata: {
        creationTime: number,
        lastSignInTime: number
      },
      isAnonymous: boolean,
      email: string,
      emailVerified: boolean,
      uid: string,
      providerId: string,
      providerData: [{
        providerId: string,
        uid: string,
        email: string,
      }],
      refreshToken: string,
      photoURL: ?any,
      phoneNumber: ?any,
      displayName: ?any,
    },
  },
};
