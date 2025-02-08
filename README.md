# QR Code Reader and Generator

This project is a simple React application built with TypeScript that allows users to read and generate QR codes. The application consists of two main components: a QR code reader that captures video input and decodes QR codes, and a QR code generator that creates QR codes from user-provided text or URLs.

## Features

- **QR Code Reader**: Utilizes a video stream to read and decode QR codes in real-time.
- **QR Code Generator**: Allows users to input text or URLs and generates a corresponding QR code.

## Technologies Used

- React
- TypeScript
- HTML
- CSS
- QR Code libraries

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Docker (for containerization)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/qr-code-app.git
   cd qr-code-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

### Running the Application

To run the application locally, use the following command:

```
npm start
```

This will start the development server and open the application in your default web browser.

### Building the Docker Image

To build the Docker image, run:

```
docker build -t qr-code-app .
```

### Running the Docker Container

To run the Docker container, use:

```
docker run -p 3000:3000 qr-code-app
```

You can then access the application at `http://localhost:3000`.

## Usage

- Use the QR Code Reader to scan QR codes using your device's camera.
- Use the QR Code Generator to create QR codes by entering text or URLs.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.