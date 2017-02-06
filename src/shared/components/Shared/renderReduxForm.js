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
const renderSelectField = ({ input, label, type, options, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
		<select {...input} placeholder={label} type={type} className="form-control">
			{options.map((item, id)=> (<option key={id} value={item.value}> {item.text}</option>))}
		</select>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
);
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


export {renderField, renderSelectField, renderDropzoneInput};
