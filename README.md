# ToDos
A simple/secure ToDos app based on bare react native app with expo local authentication support (to be run on actual physical android/ios device)

Setup Instructions
1. **npm i**
2. **cd ios && pod install**
3. On ios and android to install the app make sure developer mode is turned on physical device and allow installation from third part source (**Settings-> VPN and device management**, trust certificate for ios and similarly for android **Allow USB debugging and when prompted**, allow)  
4. For ios specifically to run the app, choose your own team (I have chosen my apple id) and automatically manage signing
![Alt text](https://github.com/aayushm9595/ToDos/blob/develop/Signing.png)
To run on android and ios, following command <br />
npx expo run:android <br />
npx expo run:ios


Running unit tests:

1. After above setup run **npm run test** to run unit test
You should get below output

![Alt text](https://github.com/aayushm9595/ToDos/blob/develop/Unit-test.png)

