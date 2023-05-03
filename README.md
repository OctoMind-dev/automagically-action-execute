# automagically-action-execute

This is a GitHub Action to execute automagically. 
To use this action a token is required. Don't have one? We're here to help. 

> drop us a note: contact@octomind.dev 🐙

## Setup


1. Add the `AUTOMAGICALLY_TOKEN` to your repository secrets 
2. Add the following yml snippet to your steps and insert a value for `url`
```yml
- uses: OctoMind-dev/automagically-action-execute@v1
  with:
    url: 
    token: ${{ secrets.AUTOMAGICALLY_TOKEN }}
```
