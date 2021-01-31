import React, { useRef, useCallback } from 'react';

import { Button, Card, CardContent, Typography } from '@material-ui/core';

import { loadStateFromJson } from '../logic/serialization';

const LoadJson = ({ updateState }) => {
  const fileInput = useRef(null);
  const onFileSelected = useCallback(
    (ev, fileInput) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateState({
          type: 'setState',
          data: loadStateFromJson(JSON.parse(e.target.result)),
        });
      };
      reader.readAsText(ev.target.files[0]);
    },
    [updateState]
  );
  return (
    <Card>
      <CardContent>
        <Typography variant="h2">1x1</Typography>
        <Typography variant="body1">
          Click the button below to upload a JSON describing the teams and the
          pairing history.
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fileInput.current.click()}
          >
            Upload JSON
          </Button>
        </div>
        <input
          type="file"
          ref={fileInput}
          accept=".json"
          style={{ display: 'none' }}
          onChange={(ev) => onFileSelected(ev, fileInput)}
        />
      </CardContent>
    </Card>
  );
};

export default LoadJson;
