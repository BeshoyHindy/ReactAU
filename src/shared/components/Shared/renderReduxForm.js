import React from 'react';
import Dropzone from 'react-dropzone';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
);
renderField.propTypes = {
	input: React.PropTypes.object.isRequired,
	field: React.PropTypes.string,
	label: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	meta: React.PropTypes.object.isRequired
};


const renderSelectField = ({ input, label,  options, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
		<select {...input} placeholder={label} className="form-control">
			{options && options.map((item, id)=> (<option key={id} value={item.value}> {item.text}</option>))}
		</select>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
);
renderSelectField.propTypes = {
	input: React.PropTypes.object.isRequired,
	field: React.PropTypes.string,
	label: React.PropTypes.string.isRequired,
	options: React.PropTypes.array,
	meta: React.PropTypes.object.isRequired
};


const renderDropzoneInput = ({input, field, label, src, meta: { touched, error, warning } }) => {
  const files = input.value;
  return (
<div>
	<label>{label}</label>	  
    <div>
		<Dropzone name={input.name} multiple={false} accept="image/*" onDrop={( filesToUpload, e ) => input.onChange(filesToUpload)} className="dropzone-single" activeClassName="active-dropzone">
			<div>Try dropping some files here, or click to select files to upload.</div>
			{files && Array.isArray(files) && (
				<ul style={{textAlign: "center"}}>
				{ files.map((file, i) => <li key={i}>{file.name} <img src={file.preview}  className="dropzone-single-preview"/></li>) }
				</ul>
			)}
			{src && !Array.isArray(files) && (
				<ul style={{textAlign: "center"}}>
					<li><img src={src}  className="dropzone-single-preview"/></li>
				</ul>
			)}
      </Dropzone>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}      
    </div>
</div>
  );
};

renderDropzoneInput.propTypes = {
	input: React.PropTypes.object.isRequired,
	field: React.PropTypes.string,
	label: React.PropTypes.string.isRequired,
	src: React.PropTypes.string,
	meta: React.PropTypes.object.isRequired
};

export {renderField, renderSelectField, renderDropzoneInput};
