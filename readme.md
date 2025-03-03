# Take Home Assessment

![](demo.gif)

## Usage

The UI has two options for use: **File Input** and **Control Input**.

- **File Input Option**  
  - The application accepts a `.txt` file as input.  
  - The file should follow the same format as described in the take-home document.  

- **Control Input Option**  
  - Instead of providing input via `stdin`, the UI provides interactive controls.  
  - These controls are to satisfy the constraint mentioning **"Input can be from a file or standard input, as the developer chooses."**
  - Controls will be disabled as the file option is executing the instructions given.  

### ⚠️ Important Note  
- The program expects **valid direction values**.  
- Invalid directions will be defaulted to North.

### ⚠️ Instance ID Disclaimer  
- The app tracks **separate users** using an `instance_id` stored locally.  
- **Do not change your `instance_id` variable locally**, as this could impact another user's game state. 

## Deployed Demo

Since this is a take-home project, I have hosted it at a separate endpoint within one of my existing projects. [https://www.seektime.app/icwa/]

## Technologies Used
- **Frontend**: SvelteKit
- **Backend**: Node.js
