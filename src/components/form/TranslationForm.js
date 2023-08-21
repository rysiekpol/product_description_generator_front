import React from 'react';
import { useForm } from 'react-hook-form';


const TranslationForm = ({ onSubmit, descriptionId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const languagesOptions = [
    "Polish",
    "Spanish",
    "French",
    "German",
    "Mandarin",
  ];

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Translate description</h3>
          <div className="form-group mt-3">
            <input
              type="hidden"
              className="form-control mt-1"
              placeholder="Product ID"
              value={descriptionId}
              {...register("descriptionid")}
            />
            {errors.descriptionid && <p className="p-1 text-danger" >{errors.descriptionid.message}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Languages</label>
            <select
              className="form-control mt-1 text-center"
              multiple
              size={languagesOptions.length}
              {...register("languages", { validate: value => value && value.length <= 5 })}
            >
              {languagesOptions.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
            {errors.languages && <p className="p-1 text-danger" >You can select up to 5 languages.</p>}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TranslationForm;
