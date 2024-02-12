import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, Creator, /*  Podcast, Episode */ } from '../entities';


export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    await em.transactional(async (em) => {

      // Users:

      const rickSanchez = new User('ricksanchez@multiversemail.com', 'PickleRick', 'Rick', 'Sánchez', '!RealRick01*');
      const mortySmith = new User('supermorty@starmail.com', 'MortyMan', 'Morty', 'Smith', 'ImMorty16!', 'https://rickandmortyapi.com/api/character/avatar/2.jpeg');
      const summerSmith = new User('partysummer@quantumsend.com', 'SummerSarcasm', 'Summer', 'Smith', 'Passbored2000');
      const jerrySmith = new User('jerrysmith5@regularmail.com', 'JerryTheClueless', 'Jerry', 'Smith', '123456');
      const birdperson = new User('birdperson@flymail.com', 'AvianWisdom', 'Bird', 'Person', 'PasswordBird30');
      const meeseeks = new User('mrmeeseeks@mailseeker.com', 'MrPodcaster', 'Meeseeks', 'Seeker', 'Password3453!');
      const unity = new User('unity@gmail.com', 'CollectiveInsights', 'Unity', 'United', 'IMisssRick!');
      const squanchy = new User('squanchy@sqanchmail.com', 'SquanchPod', 'Squanchy', 'Squanched', 'Squancheee!');
      const tammy = new User('tammy@secretmail.com', 'IntergalacticAgent', 'Tammy', 'Guterman', 'secretPsswooord123!');

      const users = [rickSanchez, mortySmith, summerSmith, jerrySmith, birdperson, meeseeks, unity, squanchy, tammy];

      for (const user of users) {
        await em.persistAndFlush(user);
      }


      // Creators:
      const jerryCreator = new Creator(jerrySmith, 'Jerry Smith, proud father and average guy navigating the ups and downs of life! 👨‍👩‍👧‍👦 Currently married to Beth Smith! Passionate about the simple joys of life - gardening is my escape, and I take pride in cultivating my backyard oasis');
      await em.persistAndFlush(jerryCreator);
      jerrySmith.creator = jerryCreator;
      await em.flush();

      const meeseeksCreator = new Creator(meeseeks, 'I´m Meeseeks, here for a good time, not a long time! I waas created to fulfill a singular purpose: Podcasting! No complications, just a Meeseeks doing what Meeseeks do!');
      await em.persistAndFlush(meeseeksCreator);
      meeseeks.creator = meeseeksCreator;
      await em.flush();

      const unityCreator = new Creator(unity, 'Embracing diversity one planet at a time! 🌌 As a hive mind entity, I thrive on connecting with different species, assimilating cultures, and creating a harmonious existence across the cosmos. 👽✨ Currently single and ready to mingle across the galaxy.');
      await em.persistAndFlush(unityCreator);
      unity.creator = unityCreator;
      await em.flush();

      const squanchyCreator = new Creator(squanchy, 'Squanchy, the life of the party and resident party animal of the multiverse! 🎉 Whether it´s squanchin´ it up or just having a squanchy good time, count me in! 😎✨ Squanchy by name, squanchy by nature! #Squanchtasti ');
      await em.persistAndFlush(squanchyCreator);
      squanchy.creator = squanchyCreator;
      await em.flush();

      em.clear();

    });
  }
}

