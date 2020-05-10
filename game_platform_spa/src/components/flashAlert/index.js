import React, { useState, useEffect  } from 'react';
import { Form, Alert } from 'react-bootstrap'

export default function FlashAlert(props) {
  const [visable, setVisable] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisable(false)
    }, props.timeout || 4000);
    return () => clearTimeout(timer);
  }, []);

	return (
    visable ? <Alert variant={props.variant}>{props.children}</Alert> : null
  )
}

 