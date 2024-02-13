import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, Creator, Podcast, Episode } from '../entities';


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

      // Podcasts

      const jerryPodcast = new Podcast('In Jerry´s Shoes Show', 'Society', jerryCreator);
      await em.persistAndFlush(jerryPodcast);

      const meeseeksPodcast = new Podcast('Meeseeks Mindset Mastery', 'Business', meeseeksCreator);
      await em.persistAndFlush(meeseeksPodcast);

      const unityPodcast = new Podcast('Intergalactic Unity Chronicles', 'History', unityCreator);
      await em.persistAndFlush(unityPodcast);

      const squanchyPodcast = new Podcast('Cosmic Cat Squanchversations', 'Arts', meeseeksCreator);
      await em.persistAndFlush(squanchyPodcast);

      // Episodes

      const jerryEpisodes = [
        new Episode(1, 'My life between plants', '02:30:45', '/audios/01', new Date('2023-01-01'), jerryPodcast),
        new Episode(2, 'Jerry´s Kitchen Chronicles: Tales of Failed Recipes', '01:10:35', '/audios/jerry/01', new Date('2023-01-01'), jerryPodcast),
        new Episode(3, 'Lost in the Laundry', '01:30:32', '/audios/jerry/02', new Date('2023-01-01'), jerryPodcast),
        new Episode(4, 'The Jerry perfect average day', '01:06:10', '/audios/jerry/03', new Date('2023-01-01'), jerryPodcast),
        new Episode(4, 'Jerry´s Guide to Awkward Small Talk', '01:06:10', '/audios/jerry/03', new Date('2023-01-01'), jerryPodcast),
      ];

      for (const episode of jerryEpisodes) {
        await em.persistAndFlush(episode);
      }

      const meeseeksEpisodes = [
        new Episode(1, 'Meeseeks Mission: From Existential Pain to Business Gain', '00:31:59', '/audios/ms/01', new Date('2023-02-11'), meeseeksPodcast),
        new Episode(2, 'Endless Pursuits: Meeseeks Motivation in the Workplace', '00:23:54', '/audios/ms/02', new Date('2023-02-18'), meeseeksPodcast),
        new Episode(3, 'Existential Entrepreneurship: A Meeseeks Manifesto', '00:45:33', '/audios/ms/03', new Date('2023-02-25'), meeseeksPodcast),
        new Episode(3, 'From Desperation to Domination: Meeseeks Business Method', '00:45:33', '/audios/ms/03', new Date('2023-02-25'), meeseeksPodcast),
      ];

      for (const episode of meeseeksEpisodes) {
        await em.persistAndFlush(episode);
      }

      const unityEpisodes = [
        new Episode(1, 'Historical Harmonies: Unity´s Perspective on the Past', '00:31:59', '/audios/u/01', new Date('2023-02-11'), unityPodcast),
        new Episode(2, 'Through Unity´s Eyes: Rewriting History´s Narratives', '00:23:54', '/audios/u/02', new Date('2023-02-18'), unityPodcast),
        new Episode(3, 'Chronicles Across Centuries: A Single-multiple Exploration', '00:45:33', '/audios/u/03', new Date('2023-02-25'), unityPodcast),
      ];

      for (const episode of unityEpisodes) {
        await em.persistAndFlush(episode);
      }

      const squanchyEpisodes = [
        new Episode(1, 'Squanchy´s Artsy Soirée: A Journey through Creative Chaos', '12:39:00', '/audios/s/01', new Date('2023-03-22'), squanchyPodcast),
        new Episode(2, 'Squanch & Sketch: Artistic Adventures Unleashed', '15:38:14', '/audios/s/02', new Date('2023-03-28'), squanchyPodcast),
        new Episode(3, 'Squanchy´s Art Extravaganza: Unleashing Creative Krakens', '13:43:09', '/audios/s/03', new Date('2023-04-04'), squanchyPodcast),
      ];

      for (const episode of squanchyEpisodes) {
        await em.persistAndFlush(episode);
      }

      em.clear();

    });
  }
}

