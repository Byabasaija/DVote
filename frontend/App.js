import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import Home from './components/Home';


export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchian state once on component load
  React.useEffect(() => {
    getGreeting()
      .then(setValueFromBlockchain)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
    }
  , []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
  }

  // function changeGreeting(e) {
  //   e.preventDefault();
  //   setUiPleaseWait(true);
  //   const { greetingInput } = e.target.elements;
    
    // use the wallet to send the greeting to the contract
  //   wallet.callMethod({ method: 'set_greeting', args: { message: greetingInput.value }, contractId })
  //     .then(async () => {return getGreeting();})
  //     .then(setValueFromBlockchain)
  //     .finally(() => {
  //       setUiPleaseWait(false);
  //     });
  // }


  return (
    <>
    Hello World
    </>
  );
}