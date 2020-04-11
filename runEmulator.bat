@echo off
start emulator -avd Pixel_2_API_28
echo Cuando el emulador este iniciado presine cualquier tecla...
pause>nul
react-native run-android --deviceId emulator-5554