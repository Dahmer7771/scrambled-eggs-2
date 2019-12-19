define({ "api": [
  {
    "type": "post",
    "url": "/api/recipe/create",
    "title": "Создает новый рецепт",
    "name": "CreateRecipe",
    "group": "Recipe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Обязательное название рецепта.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Обязательное описание рецепта.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "steps",
            "description": "<p>Обязательнае инструкция приготовления рецепта.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "category",
            "description": "<p>Категория рецепта.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "ingredient",
            "description": "<p>Ингредиенты рецепта.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mark",
            "description": "<p>Тег рецепта.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Сообщение о типе ошибки</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/api/recipes/ingredients",
    "title": "Получить ингредиенты рецептов",
    "name": "GetIngredients",
    "group": "Recipe",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "ingredients",
            "description": "<p>Ингредиенты в формате json.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/api/recipes/articles_number",
    "title": "Запрос на получение кол-ва рецептов в базе",
    "name": "GetNumber",
    "group": "Recipe",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "number",
            "description": "<p>Количество рецептов в базе</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/api/recipes/article_by_id",
    "title": "Получить рецепт по id",
    "name": "GetRecipe",
    "group": "Recipe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "recipe",
            "description": "<p>Рецепт в формате json.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/api/recipes/article_by_ingredients",
    "title": "Получить рецепт по ингредиентам",
    "name": "GetRecipeByIngredients",
    "group": "Recipe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ingredients",
            "description": "<p>Массиф ингредиентов для поиска.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "recipe",
            "description": "<p>Рецепт в формате json.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipe"
  },
  {
    "type": "get",
    "url": "/api/recipes/articles",
    "title": "Запрос на получение рецептов",
    "name": "GetRecipes",
    "group": "Recipes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>Поле для сортировки.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>Сортировка по убыванию или возрастанию.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Сколько нужно получить рецептов.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "skip",
            "description": "<p>Сколько нужно пропустить рецептов от начала.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "articles",
            "description": "<p>Рецепты в формате json.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Recipes"
  }
] });
