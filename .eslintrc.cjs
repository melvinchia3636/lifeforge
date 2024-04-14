module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:tailwindcss/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import",
        "tailwindcss"
    ],
    "rules": {
        "@typescript-eslint/space-before-function-paren": "off",
        "import/order":
            [
                1,
                {
                    "groups":
                        [
                            "external",
                            "builtin",
                            "internal",
                            "sibling",
                            "parent",
                            "index"
                        ],
                    "pathGroups": [
                        {
                            "pattern": "typedec",
                            "group": "internal"
                        },
                        {
                            "pattern": "providers",
                            "group": "internal"
                        },
                        {
                            "pattern": "components",
                            "group": "internal"
                        },
                        {
                            "pattern": "sidebar",
                            "group": "internal"
                        },
                        {
                            "pattern": "hooks",
                            "group": "internal",
                        },
                    ],
                    "pathGroupsExcludedImportTypes":
                        ["internal"],
                    "alphabetize": {
                        "order": "asc",
                        "caseInsensitive": true
                    }

                }
            ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx",
                    ".d.ts"
                ],
                "moduleDirectory": ["node_modules", "src/"]
            },
            "alias": {
                "extensions": [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
                "map": [
                    ['@components', './src/components/general/'],
                    ['@providers', './src/providers/'],
                    ['@hooks', './src/hooks/'],
                    ['@sidebar', './src/components/Sidebar/'],
                    ["@typedec", "./src/types/"],
                ],
            }
        },
        "react": {
            "version": "detect"
        }
    }
}
