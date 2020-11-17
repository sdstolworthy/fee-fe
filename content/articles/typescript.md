---
title: Introduction to TypeScript
subtitle: Introducing types to JavaScript.
date: 2017-09-12T05:00:00.000Z
authors:
  author1:
    name: Spencer Stolworthy
    avatar: philip.double.png
time: 1 hour
difficulty: easy
coverimage: frontenduniverse.jpg
tags:
  - 400
order: 4.4
---

# What is TypeScript?

## Introduction

TypeScript is an extension of JavaScript that adds support for static typing. TypeScript is designed to aid in the development of large client-side and server-side applications. TypeScript transpiles to JavaScript, which means TypeScript source code can be converted to Javascript source code with the use of a transpiler such as Babel or TypeScript Checker.

## Static Typing

Static typing is the process of ensuring that all data that flows through an application meets an expected type definition.
By default, JavaScript is a dynamically typed language.
This means that a variable's type is inferred at runtime rather than defined beforehand.

Let's look at some code, in JavaScript, you can define a variable without
explicity defining its type. For example, you can define a variable and Javascript
and provide an initial value. Alternatively, you can define a variable in Javascript
and not initialize it, then assign it a value later. All of this can be done without specifying a type for the variable.

#### Javascript

```JavaScript
// Define count and initialize it with a value
var count = 0

// Define denominator and provide no initial value
var denominator

// Set denominator equal to a value
denominator = 2
```

#### TypeScript

```TypeScript
let count: number = 0

let denominator: number
denominator = 2
```

Notice that you annotate the variable's type when declaring it in TypeScript. Let's modify our previous code just a bit.

#### Javascript

```Javascript
let count = 0
count++ // count == 1
count = "hello" // count = "hello"
count++ // count == NaN
```

Uh-oh. We assigned a string to count. Then, when we tried to increment count, the operation returned `NaN`.
Now, this example may seem contrived, but this is actually a common problem, and it is one of the main problems that a statically typed language can help solve.

Let's look at the same code in TypeScript:

```TypeScript
let count: number = 0
count++ // count == 1
count = "hello" // count = "hello"
count++ // count == NaN
```

Great, not much changed... or so it seems. When you attempt to transpile this code,
the TypeScript transpiler will raise an error, and point you back to the line where the error occurs.
Additionally, if you are using an advanced text editor or IDE, you will see error highlights and descriptions explaining that this code will not work as expected.

This example is simple, but starts to demonstrate the power of static typing.

Great, not much changed... or so it seems. When you attempt to transpile this code,
the TypeScript transpiler will raise an error, and point you back to the line where the error occurs.
Additionally, if you are using an advanced text editor or IDE, you will see error highlights and descriptions explaining that this code will not work as expected.

This example is simple, but starts to demonstrate the power of static typing.

## Mental Load

Beyond static type checking, TypeScript helps reduce mental load on developers.
When types are statically defined, it is easier to comprehend data shapes, and visualize how data is flowing through the application.
This benefit applies to new developers brought onto the project, as well as current developers who are reviewing merge requests
or loading the project into their mental RAM at the start of a workday.

Let's say we are TMDb and we want to store information about movies. We might come up with an object that looks similar to this:

```JSON
{
  "adult": false,
  "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
  "belongs_to_collection": null,
  "budget": 63000000,
  "genres": [
    {
      "id": 18,
      "name": "Drama"
    }
  ],
  "homepage": "",
  "id": 550,
  "imdb_id": "tt0137523",
  "original_language": "en",
  "original_title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
  "popularity": 0.5,
  "poster_path": null,
  "production_companies": [
    {
      "id": 508,
      "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      "name": "Regency Enterprises",
      "origin_country": "US"
    },
    {
      "id": 711,
      "logo_path": null,
      "name": "Fox 2000 Pictures",
      "origin_country": ""
    },
    {
      "id": 20555,
      "logo_path": null,
      "name": "Taurus Film",
      "origin_country": ""
    },
    {
      "id": 54050,
      "logo_path": null,
      "name": "Linson Films",
      "origin_country": ""
    },
    {
      "id": 54051,
      "logo_path": null,
      "name": "Atman Entertainment",
      "origin_country": ""
    },
    {
      "id": 54052,
      "logo_path": null,
      "name": "Knickerbocker Films",
      "origin_country": ""
    },
    {
      "id": 25,
      "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      "name": "20th Century Fox",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1999-10-12",
  "revenue": 100853753,
  "runtime": 139,
  "spoken_languages": [
    {
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "How much can you know about yourself if you've never been in a fight?",
  "title": "Fight Club",
  "video": false,
  "vote_average": 7.8,
  "vote_count": 3439
}
```

Source: [TMDb](https://developers.themoviedb.org/3/movies/get-movie-details)

Woah... that's a lot of information. It's a lot of information that some poor developer is going to have to load into their head each time they work on a feature that implements this data.

TypeScript itself is not a panacea to this problem, but when combined with good coding practices and a modern text editor or IDE, TypeScript can help some of the pains involved with working with external data.

Using TypeScript, we can define what this data will look like. Then, as we use the data, the TypeScript compiler will help us find places we may have used it wrong.
Additionally, our IDE or text editor will be able to provide hints about the object's definition while we write code.

In TypeScript, we could create an `interface` for this particular object shape.

```TypeScript
export interface Language {
  iso_639_1: string
  name: string
}
export interface Country {
  iso_3166_1: string
  name: string
}
export interface Company {
  id: string
  logo_path: string
  name: string
  origin_country: string
}
export interface Genre {
  id: number
  name: string
}
export enum Status = {
  Released,
  PostProduction,
}
export interface Movie {
  spoken_languages: Array<Language>
  production_countries: Array<Country>
  production_companies: Array<Company>
  overview: string
  id: string
  original_language: Language
  budget: number
  genres: Array<Genre>
  popularity: number
  poster_path?: string
  backdrop_path?: string
  homepage?: string 
  release_date: Date 
  revenue: number
  status: Status
  title: string
  tagline: string
  vote_average: number
  vote_count: number
}
```

Defining an interface for our movie makes it easier to understand what each field means, and what data it is expecting. (Note that in the example above some of the fields would need to be [serialized](https://en.wikipedia.org/wiki/Serialization) in order to meet the interface.)


