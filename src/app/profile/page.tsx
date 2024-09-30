'use client'

import Profile from "@/components/Profile/Profile";
import { store } from "@/store/store";
import { Provider } from 'react-redux';

export default function Reg() {
  return (
    <div>
      <Provider store={store}>
        <Profile/>
      </Provider>
    </div>
  );
}

