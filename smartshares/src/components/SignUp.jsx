import React from 'react';
import FieldGroup from './FieldGroup';

const SignUp = ({ onChange }) => (
  <div className="container-full">
    <div className="col-xs-3 col-md-4">
    </div>
    <div className="col-xs-6 col-md-4">
      <h2>Create Account</h2>
      <form>
        <FieldGroup
          id="signUpEmailAddress"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />
        <FieldGroup
          id="signUpPassword"
          label="Password"
          type="password"
          placeholder="Password"
        />
        <FieldGroup
          id="signUpConfirmationPassword"
          label="Password"
          type="password"
          placeholder="Confirm Password"
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" checked readOnly />
            I agree to the terms
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    <div className="col-xs-3 col-md-4">
    </div>
  </div>
)

export default SignUp;
