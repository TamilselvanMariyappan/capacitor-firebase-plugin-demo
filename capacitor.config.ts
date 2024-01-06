
import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'net.xxx.xxx',
  plugins: {   
    FirebaseAuthentication: {
        "skipNativeAuth": false,
        "providers": ["google.com", "microsoft.com"]
      }
  }
};

export default config;
