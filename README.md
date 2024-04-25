# Create ComicInfo XML File

This application is designed to gather metadata for comics using a comic ID. It leverages the Marvel API to retrieve primary metadata for the comic, such as title, issue number, series information, and more. Additionally, it scrapes the webpage of the comic to acquire additional metadata that may not be available through the API, such as the comic summary and cover artist information.

Once all the necessary metadata is collected, the application creates a ComicInfo.xml file. This XML file contains a structured representation of the comic's metadata, including both the information obtained from the Marvel API and the scraped data from the comic's webpage.

## Installation

To use this application, follow these steps:

1. Clone this repository to your local machine using Git:

   ```bash
   git clone https://github.com/Karl-Horning/create-comicinfo-xml-file
   ```

2. Navigate to the project directory:

   ```bash
   cd create-comicinfo-xml-file
   ```

3. Install dependencies by running:

   ```bash
   npm install
   ```

## Usage

To run the application, execute the following command in your terminal:

```bash
node index.js
```

The application will prompt you to enter the comic ID. Once you provide the comic ID, the application will fetch metadata from the Marvel API, scrape additional information from the comic's webpage, create a ComicInfo.xml file, and save it in the project directory.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Karl Horning

[GitHub](https://github.com/Karl-Horning/) | [LinkedIn](https://www.linkedin.com/in/karl-horning/) | [CodePen](https://codepen.io/karlhorning)