# automagically-action-execute

This is a GitHub Action to execute automagically. 
To use this action a token is required. Don't have one? We're here to help. 

> drop us a note: contact@octomind.dev 🐙

## Setup


1. Add the `AUTOMAGICALLY_TOKEN` to your repository secrets 
2. Add the following yml snippet to your steps and insert a value for `url` pointing to a publicly accessible deployment of your branch.
```yml
- uses: OctoMind-dev/automagically-action-execute@v2
  with:
    url: <publicly accessible url to your deployment>
    token: ${{ secrets.AUTOMAGICALLY_TOKEN }}
    testTargetId: <your testTargetId that you also get from us>
```


## Change Log

- 2023-07-20: Added requirement for setting `testTargetId` to enable v2 API
