# automagically-action-execute

This is a GitHub Action to execute automagically. 
To use this action a token is required. Don't have one? We're here to help. 

> drop us a note: contact@octomind.dev 🐙

## Setup


1. Add the `AUTOMAGICALLY_TOKEN` to your repository secrets 
2. Add the `AUTOMAGICALLY_TEST_TARGET_ID` you will also receive from us to your repository secrets
3. Add the following yml snippet to your steps and insert a value for `url` pointing to a publicly accessible deployment of your branch.
```yml
- uses: OctoMind-dev/automagically-action-execute@v1
  with:
    url: 
    token: ${{ secrets.AUTOMAGICALLY_TOKEN }}
    testTargetId: ${{ secrets.AUTOMAGICALLY_TEST_TARGET_ID }}
```
