const axios = require("axios");
const { Character } = require("../DB-Config");

const Reset = "\x1b[0m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgRed = "\x1b[31m";

const initalUpload = async () => {
    try {
      
      let createdCharacters = 0
      let currentPage = 1;
      let totalPages = 1;
      
      do {
        
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
  
        totalPages = data.info.pages;
        
        for (const character of data.results) {
          const { id, name, status, species, gender, origin, location, image } = character;
    
          const [characterInstance, created] = await Character.findOrCreate({
            where: { id },
            defaults: {
              name,
              status,
              species,
              gender,
              origin: origin.name,
              location: location.name,
              image,
            },
          });

          if (created) {
            createdCharacters++
          }
        }

      currentPage++;

      } while (currentPage <= totalPages);
  
      if (createdCharacters === 0) {
        console.log(FgGreen, "Initial charge successfully:",FgYellow,"all characters already exist in the database.", Reset);
      } else {
        console.log(FgGreen,"Initial charge successfully:", FgYellow,`${createdCharacters} characters has been created in the database`, Reset);
      }
    } catch (error) {
      console.log(FgRed, JSON.stringify({error: "Database preload couldn't be processed: " + error.message }));
    }
  };

  module.exports = initalUpload;