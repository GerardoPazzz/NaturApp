import { redirect } from 'expo-router';

export default function Index() {
  return redirect('/(tabs)/home');
}
