# AI Usage Disclosure

## AI Tools Used

* **ChatGPT (GPT-6):** Used to answer questions, discuss technical topics, plan the project, generate code, troubleshoot errors, and document the application.
* **GitHub Copilot:** Initially used through its VS Code integration to generate code. However, because it took a long time to generate code, I decided to use ChatGPT as my primary AI assistant for the rest of the project.

## Technical Decisions

I decided on the project stack and the overall architecture. My goal was to keep the application simple while following clean code principles and using a basic but well-structured architecture for both the frontend and backend.

The selected stack consists of React, TypeScript, Node.js, Express, and MongoDB. The frontend uses Vite and Material UI (MUI), while the backend follows a layered architecture.

The AI assistants suggested implementations and provided code examples, but I reviewed the suggestions, made modifications, and decided how to apply them to the project.

## Development Process

### 1. Starting the Project

* I asked ChatGPT to create a development plan. In the initial prompt, I shared all the project requirements. I also specified that the project should be simple but follow clean code principles, use a straightforward architecture for both the frontend and backend, and use React, Node.js, and MongoDB as the main technologies.
* ChatGPT suggested using Vite and creating a new project. Initially, I planned to use a template I had previously built for React web applications. However, after considering the requirements, I decided to create a new project because the template included an architecture, rules, validations, and other features that might not be necessary for this application.
* ChatGPT suggested a simple architecture for the project, which I applied.

### 2. Initial Frontend Development

* I initially asked GitHub Copilot to modify the README and add instructions for running the application.
* After noticing that GitHub Copilot took a long time to generate code, I decided to use ChatGPT as my primary AI assistant for the rest of the project.
* I asked ChatGPT how to implement React Router, including the necessary dependencies and implementation steps. I followed the instructions and implemented it.
* Next, I created a `MainComponent` to maintain a consistent UI across the application. I asked ChatGPT how to implement it and requested a code example. I then made some modifications to adapt the code to the project.

### 3. Pokémon Card Creation

* I considered using PrimeReact or Material UI to implement the card component. I asked ChatGPT to show me both implementations and decided to use Material UI.
* ChatGPT provided code for the Pokémon card component. I applied it and made some modifications to follow clean code principles. For example, I moved the interface definition into a separate file.

### 4. Pokémon Service

* At this stage, I needed to retrieve Pokémon data. To continue developing the UI, I initially decided to retrieve the data directly from the frontend.
* I asked ChatGPT to provide the necessary code to create the service. I implemented the required functionality using Axios, including its configuration and the service itself.

### 5. Integrating the Service and Card Components

* I started integrating the service to retrieve Pokémon and display them using the card component I had previously created. I asked ChatGPT how to connect these parts, and I implemented the suggested code.

* The implementation had an error related to the following MUI component:

  ```tsx
  <Box display="flex" justifyContent="center" py={6}>
  ```

  I asked ChatGPT to help me understand and fix the issue. The solution was to use the `sx` prop:

  ```tsx
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      py: 6,
    }}
  >
  ```

* After seeing the UI results, I made some styling modifications. I also moved the logic from `PokedexPage` into a separate `usePokedex` file to separate the UI from the application logic.

### 6. Loading More Pokémon and Managing Favorites

* I wanted to add a button to load the next 20 Pokémon, so I asked ChatGPT for an implementation and applied the suggested code.
* I made further modifications to move the logic into `usePokedex` and keep only the UI in `PokedexPage`. I followed the same approach for the card component because the suggested implementation initially placed everything in a single file.
* I tested the functionality and confirmed that additional Pokémon could be loaded.
* I followed a similar process to implement the functionality for adding Pokémon to favorites.

### 7. Pokémon Search

* I asked ChatGPT to help implement the search functionality. The initial suggestion was to retrieve all Pokémon names first and then use that data to perform searches.
* I explained that this was unnecessary for the current implementation. Instead, the application should search for a Pokémon and display a message if no results were found.
* ChatGPT provided an updated implementation, which I applied. As with previous features, I separated the UI, logic, and components to maintain clean code.
* I tested the input and search functionality. I then decided that adding a search button would provide a better user experience, so I asked ChatGPT to help implement it. I applied the changes and tested them.
* I also made some CSS adjustments to improve the UI.
* During testing, I found another issue: the current results disappeared when I started typing in the search input. I discussed the problem with ChatGPT and implemented the suggested fix.

At this point, I had completed the main frontend functionality. On the second day of development, I asked ChatGPT what I should work on next. Although it suggested additional features and improvements, I decided to start working on the backend instead.

### 8. Starting the Node.js Backend

* I asked ChatGPT to help me start the backend. Since I wanted a simple architecture for both projects, ChatGPT provided a development plan and an initial project structure.
* ChatGPT initially suggested organizing the backend by modules, but I preferred a layered architecture. I explained my preference, and ChatGPT adjusted the proposed structure accordingly.
* I installed the necessary dependencies and initialized the project using the commands suggested by ChatGPT.
* I added the required configuration files, including the application entry point, server, and environment configuration. ChatGPT provided examples, which I modified to fit the project.
* Initially, I considered using a cloud-hosted MongoDB database. However, I later decided to use a local MongoDB instance instead. I asked ChatGPT how to configure it and followed its instructions.
* Before implementing the endpoints, I reviewed the suggested code and asked ChatGPT to follow clean code principles and the coding rules I had established.

### 9. First Endpoint: Retrieving Pokémon

* I asked ChatGPT to implement an endpoint that retrieves Pokémon data from the PokéAPI. It provided the necessary code for the service, controller, and related components. I made some modifications to improve the implementation and reinforced the coding rules I wanted to follow in subsequent code generation.
* While implementing the favorites endpoints with MongoDB, I asked how to add a user ID to the project. I decided to use a hardcoded UUID for this implementation.
* ChatGPT added middleware to validate the user ID. However, it also suggested additional user ID validations in each controller. I removed those redundant validations because the middleware already handled this responsibility.
* I decided to add two simple validations when saving a favorite Pokémon: verify that the Pokémon exists and prevent the same Pokémon from being added to favorites more than once. I explained these requirements to ChatGPT and applied the suggested implementation.

### 10. Connecting the Frontend and Backend

* I started integrating the frontend with the backend. Since the frontend service initially retrieved Pokémon data directly from the public API, I asked ChatGPT to help modify the service to use our own backend instead.
* Retrieving Pokémon and loading additional results worked correctly, but the search functionality failed. I asked ChatGPT to help identify and fix the problem. I applied the suggested solution, performed additional tests, and confirmed that the search worked correctly.
* For favorites, I asked ChatGPT to help connect the frontend functionality to the backend. I specified that we should keep the favorite Pokémon IDs in React state for the UI while also implementing the API requests needed to save and remove favorites in MongoDB.

### 11. Final Requirement Validation

* I shared the original project requirements with ChatGPT to identify what had been implemented and what remained.
* Regarding functionality, ChatGPT identified the requirement for a 404 page when a Pokémon was not found. However, I decided to keep the existing message displayed when a search returns no results.
* ChatGPT also suggested generating a random UUID in the frontend. I decided to keep the UUID hardcoded for this implementation.
* Finally, ChatGPT identified the README and AI usage documentation as items that needed to be completed. I asked ChatGPT to help prepare the README, answered its questions about the project configuration, and added the resulting documentation to the project.

## Verification and Review

Throughout development, I manually tested the main application flows and reviewed AI-generated suggestions before applying them.

The verification process included:

* **Pokémon listing:** Verified that Pokémon data was retrieved from the backend and displayed correctly, including images and names. Also checked that loading more Pokémon worked as expected.
* **Search functionality:** Tested searches by Pokémon name, including searches with no matching results. Reviewed and corrected issues related to displaying search results.
* **Favorites management:** Verified that Pokémon could be added to and removed from favorites, that duplicate favorites were handled by the backend, and that favorite data persisted in MongoDB.
* **Frontend and backend integration:** Checked that the frontend used the application's REST API instead of calling PokeAPI directly. Investigated and fixed issues affecting communication between the two layers.
* **Input validation and error handling:** Reviewed how the backend handled invalid user identifiers, nonexistent Pokémon, and attempts to add an already existing favorite.
* **Database integration:** Verified that favorite records were stored and retrieved through MongoDB.
* **User interface:** Reviewed the Pokémon cards, search controls, favorite indicators, and no-results message to ensure the main flows were understandable and usable.

AI-generated suggestions were treated as proposals rather than final decisions. I reviewed the suggested code, tested the resulting behavior, and modified or rejected suggestions when they did not fit the project requirements or when a simpler solution was sufficient.

For example, I decided to display a message when a Pokémon search returned no results rather than leave the page blank. I also kept the implementation of the user identifier simple by using a fixed UUID, as authentication and individual user registration were outside the scope of this assessment.

The final implementation was reviewed against the assignment's required features, with an emphasis on keeping the solution understandable and avoiding unnecessary complexity.


## Improvements

* I if have integrated the IA to VS Code, like Cursor orr a pro plan for VS Code, It could be more faster and easier.
* All hardcoded text and labels, move to a file to manage that.
* Move to other css files all the styles in the HTML tags, MUI components.
* IN backend change all console.log to library like Winston to show logs.
* Improve error handler in backend.
* Improve all process for UUID.
* Change all the process to get the initial info inside the use effect, using tanstack query
* Error handler in front end.
