import React from 'react';
import FieldGroup from './FieldGroup';

const SignIn = ({ onChange }) => (
  <div>
    <div className="col-xs-3 col-md-4">
    </div>
    <div className="col-xs-6 col-md-4">
      <h2>Sign In</h2>
      <form>
        <FieldGroup
          id="signInEmailAddress"
          type="email"
          label="Email address"
          placeholder="Email"
        />
        <FieldGroup
          id="signInPassword"
          label="Password"
          type="password"
          placeholder="Password"
        />
        <div className="checkbox">
          <label>
            <input type="checkbox" checked readOnly />
            Keep me logged in
          </label>
        </div>
        <button type="submit" className="btn btn-default btn-primary">Submit</button>
      </form>
    </div>
    <div className="col-xs-3 col-md-4">
    </div>
  </div>
)

export default SignIn;
