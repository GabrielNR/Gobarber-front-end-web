//Imports
import { useField } from '@unform/core';
import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

import { IconBaseProps } from 'react-icons';
// import { FiAlertCircle } from 'react-icons/fi';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

//Interfaces
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: {};
  icon?: React.ComponentType<IconBaseProps>;
}

//app
export function Input({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}: InputProps){

  //refs
  const inputRef = useRef<HTMLInputElement>(null)
  
  //Estados
  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)
  
  //fields
  const { fieldName, defaultValue, error, registerField } = useField(name);


  //Callbacks
  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsField( !!inputRef.current?.value)
  }, [])


  //useEffect
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  //app
  return (
    <Container style={containerStyle} $isErroded={!!error} $isField={isField} $isFocused={isFocused}>
      {Icon && <Icon size={20} /> }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue} 
        ref={inputRef}
        {...rest}
      />
        {
          error && 
            <Error title={error}>
              <FiAlertCircle color="#c53030" size={20}/>
            </Error>
        }
    </Container>
  )
}