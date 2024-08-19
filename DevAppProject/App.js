import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AuthProvider } from "./src/config/auth.js"
import MyDrawer from "./src/components/Drawer";

export default function App() {

  return (
      <AuthProvider>
        <MyDrawer />
      </AuthProvider>
  );
}
