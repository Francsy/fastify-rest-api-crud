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
        new Episode('Episode 1', 'My life between plants', '02:30:45', '/audios/01', new Date('2023-01-01'), jerryPodcast, 'Hey, fellow Earthlings! 🌎 In this episode, I dive into the green universe that is my life between plants. From the perils of overwatering to the silent conversations with my leafy companions, join me in a journey through the unexplored garden of my everyday existence. Expect laughs, relatable plant parenting struggles and maybe even a surprise cameo by a particularly opinionated ficus.'),
        new Episode('Episode 2', 'Jerry´s Kitchen Chronicles: Tales of Failed Recipes', '01:10:35', '/audios/jerry/01', new Date('2023-01-01'), jerryPodcast, 'Hello, kitchen enthusiasts and culinary connoisseurs! I embark on a culinary journey filled with mishaps, kitchen chaos and a dash of questionable decision-making. From my attempt at gourmet grilled cheese to the legendary burnt lasagna incident, join me as I spill the beans (literally) on my not-so-masterful adventures in the world of cooking.'),
        new Episode('Episode 3', 'Lost in the Laundry', '01:30:32', '/audios/jerry/02', new Date('2023-01-01'), jerryPodcast, 'Join me in this episode as I unravel the mysteries of the laundry room. From the epic sock disappearance to the perilous adventure of mixing whites and colors, this is a tale of the ordinary turned extraordinary. Get ready for a spin cycle of laughs, a fabric softener of life lessons, and perhaps a few lost socks finding their way back home.'),
        new Episode('Episode 4', 'The Jerry perfect average day', '01:06:10', '/audios/jerry/03', new Date('2023-01-01'), jerryPodcast, 'From the flawless cup of lukewarm coffee to the symphony of everyday mishaps, we explore the art of achieving the perfect average day. It´s a tale of mediocrity, minor wins, and the pursuit of the perfectly uneventful 24 hours. Spoiler alert: Expect zero superhero appearances and minimal dramatic plot twists.'),
        new Episode('Episode 5', 'Jerry´s Guide to Awkward Small Talk', '01:06:10', '/audios/jerry/03', new Date('2023-01-01'), jerryPodcast, '  I embark on a comedic exploration of the intricate dance known as small talk. From navigating elevator silence to surviving office chit-chat, I share my not-so-expert tips on turning awkward moments into hilariously relatable anecdotes. Get ready to laugh, cringe, and maybe even pick up a few survival strategies for your next awkward encounter! 😅'),
      ];

      for (const episode of jerryEpisodes) {
        await em.persistAndFlush(episode);
      }

      const meeseeksEpisodes = [
        new Episode('1x01', 'Meeseeks Mission: From Existential Pain to Business Gain', '00:31:59', '/audios/ms/01', new Date('2023-02-11'), meeseeksPodcast, 'Greetings, ambitious beings and seekers of success! In this special Meeseeks edition, we delve into the cosmic journey from existential dread to unparalleled business triumphs. Join me as I, along with my Meeseeks comrades, explore the depths of our existence and uncover the secrets to turning pain into professional prosperity.'),
        new Episode('1x02', 'Endless Pursuits: Meeseeks Motivation in the Workplace', '00:23:54', '/audios/ms/02', new Date('2023-02-18'), meeseeksPodcast, 'Greetings, office enthusiasts and workplace wanderers! Join me, your friendly Meeseeks, in an exploration of perpetual motivation within the cubicle confines. In this episode, we dive deep into the cosmic sea of workplace pursuits, unraveling the secrets of staying motivated, even in the most mundane tasks. Expect motivational mantras, cosmic career advice, and maybe a few existential revelations.'),
        new Episode('1x03', 'Existential Entrepreneurship: A Meeseeks Manifesto', '00:45:33', '/audios/ms/03', new Date('2023-02-25'), meeseeksPodcast, 'In this episode, we´ll explore the depths of entrepreneurial spirit, discuss the fusion of existential wisdom with business ventures, and discover how to turn the cosmic chaos into a successful startup saga. Get ready for profound insights, cosmic business strategies, and a touch of Meeseeks motivational magic. It´s time to manifest your entrepreneurial destiny!'),
        new Episode('1x04', 'From Desperation to Domination: Meeseeks Business Method', '00:45:33', '/audios/ms/03', new Date('2023-02-25'), meeseeksPodcast, 'In this episode, we´ll delve into the Meeseeks Business Method, exploring how moments of desperation can be the catalyst for unparalleled success.'),
      ];

      for (const episode of meeseeksEpisodes) {
        await em.persistAndFlush(episode);
      }

      const unityEpisodes = [
        new Episode('Ep. 1', 'Historical Harmonies: Unity´s Perspective on the Past', '00:31:59', '/audios/u/01', new Date('2023-02-11'), unityPodcast, 'Join me, Unity, as I take you on a harmonious journey through the annals of time. In this episode, we´ll explore the tapestry of history through my unique perspective, intertwining tales of unity, diversity, and the cosmic symphony of the past.'),
        new Episode('Ep. 2', 'Through Unity´s Eyes: Rewriting History´s Narratives', '00:23:54', '/audios/u/02', new Date('2023-02-18'), unityPodcast, 'Hello, time travelers and cosmic storytellers! Join me, Unity, in this captivating episode as we embark on a journey through the corridors of history. Together, we´ll reimagine the past through my unique lens, exploring untold stories, rewriting narratives and infusing a touch of unity into the historical tapestry.'),
        new Episode('Ep. 3', 'Chronicles Across Centuries: A Single-multiple Exploration', '00:45:33', '/audios/u/03', new Date('2023-02-25'), unityPodcast, 'Greetings, time-traveling adventurers and cosmic chronicle seekers! In this episode, we embark on a mind-bending journey through the ages, exploring the dichotomy of singular and multiple timelines.'),
      ];

      for (const episode of unityEpisodes) {
        await em.persistAndFlush(episode);
      }

      const squanchyEpisodes = [
        new Episode('001', 'Squanchy´s Artsy Soirée: A Journey through Creative Chaos', '12:39:00', '/audios/s/01', new Date('2023-03-22'), squanchyPodcast),
        new Episode('002', 'Squanch & Sketch: Artistic Adventures Unleashed', '15:38:14', '/audios/s/02', new Date('2023-03-28'), squanchyPodcast),
        new Episode('003', 'Squanchy´s Art Extravaganza: Unleashing Creative Krakens', '13:43:09', '/audios/s/03', new Date('2023-04-04'), squanchyPodcast),
      ];

      for (const episode of squanchyEpisodes) {
        await em.persistAndFlush(episode);
      }

      em.clear();

    });
  }
}

