# MMM-YT-SubCount

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This module show the number of Youtube Subscriber on the MagicMirror. All you need is a Google Developer Account to activate the Youtube API. The use of the API is free 🙌

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: "MMM-YT-SubCount",
      config: {
        // See below for configurable options
      }
    }
  ]
};
```

## Configuration options

| Option    | Description                                                                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| `option1` | _Required_ DESCRIPTION HERE                                                                                     |
| `option2` | _Optional_ DESCRIPTION HERE TOO <br><br>**Type:** `int`(milliseconds) <br>Default 60000 milliseconds (1 minute) |
