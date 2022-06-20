import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "../store";
import { Provider } from "react-redux";
import { SwitchTransition, Transition } from "react-transition-group";
import gsap from "gsap";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <SwitchTransition mode="out-in">
        <Transition
          key={Math.random()}
          timeout={500}
          // in={true}
          onEnter={enter}
          onExit={exit}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Component {...pageProps} />
        </Transition>
      </SwitchTransition>
    </Provider>
  );
}

export default MyApp;

function enter(node: Element) {
  gsap.from(node, {
    duration: 0.5,
    autoAlpha: 0,
  });
}

function exit(node: Element) {
  gsap.to(node, {
    duration: 0.5,
    autoAlpha: 0,
  });
}
