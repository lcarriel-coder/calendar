import { useState,useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {} , formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {

      setFormState(initialForm);
    
     
    }, [initialForm])

 
    useEffect(() => {

        createValidators();
    
     
    }, [formState])
    

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    
  const createValidators = () => {
    const formCheckedValue={};
    for (const formField of Object.keys( formValidations )) {
        const [fn, errorMessage = 'Este campo es requerido.'] = formValidations[formField] 
        formCheckedValue[`${ formField }Valid`]= fn( formState[formField] ) ? null : errorMessage;
    }
    setFormValidation(formCheckedValue);
 
  }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}