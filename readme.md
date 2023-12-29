# NIC (Nest Interaction CLI)

## About the Project

NIC (Nest Interaction CLI) is a simple yet powerful command-line tool designed to streamline the creation of Lambda function template-based projects. This tool makes it easier to standardize and enhance efficiency in initiating new projects, ensuring consistency and quality in development.

## Features

- **Quick Creation**: Generate new Lambda projects in seconds.
- **Easy to Use**: Simple and intuitive command-line interface.
- **Verbose Option**: Use `-v` or `--verbose` for a detailed report of the files generated during project creation.
- **Template Schema Functionality**: Specify a schema to customize your project creation.

## Template Schema Functionality

NIC allows the specification of a template schema for project creation. You can use a schema in two ways:

1. **Default Schema**: If a file named `schema.txt` is present in the current directory, NIC will automatically use it.
2. **Custom Schema**: Use the `-p` option to specify a custom path for the schema file. For example:
   ```bash
   nic create [project-name] -p ./base/schema.txt
   ```

### Schema Format

The `schema.txt` file should follow a specific format, using snake case for property names and indicating data types. Additionally, you can mark fields as optional using a `?`. Here is an example of how the schema can be structured:

```
country_uid: ?string
country: number
country_name: string
language_id: string
language_code: string
currency: string
iso_code: string
timezone: string
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version X.X or higher)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone this repository
git clone https://github.com/thiago-js/nest-interaction-cli.git
# Go to the project folder
cd nic
# Install dependencies
npm install
# Link for global use
npm link
```

## Usage

```bash
# To generate a new Lambda project
nic create [project-name]
# For a detailed report of the generated files
nic create [project-name] -v
# To specify a custom path for the schema
nic create [project-name] -p ./base/schema.txt
# For help
nic --help
```

## Contributions

:rocket: [thiago simao](thiago-js)

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
