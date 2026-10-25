import React from 'react';

// The Bootstrap 3 markup react-bootstrap 0.31's FormGroup, ControlLabel, FormControl and HelpBlock rendered.
// react-bootstrap 1+ renders Bootstrap 4/5 classes, which the Bootstrap 3 CSS in src/css doesn't style.
function FieldGroup({ id, label, help, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="control-label">{label}</label>
      <input id={id} className="form-control" {...props} />
      {help && <span className="help-block">{help}</span>}
    </div>
  );
}

export default FieldGroup;
