import React from 'react';
import  StepperComp  from '../components/registration/StepperComp';
import BottomNav from '../components/reusable/BottomNav';
import Footer from '../components/reusable/Footer';

function Registration() {
  return (
    <div className="App">
      <BottomNav />
      <StepperComp/>
      <Footer />
    </div>
  );
}

export default Registration;
