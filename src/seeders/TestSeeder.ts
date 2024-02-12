import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User, /* Creator, Podcast, Episode */ } from '../entities';


export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {

    const rickSanchez = new User('ricksanchez@gmail.com', 'Rickinillo', 'Rick', 'Sánchez', 'Password1234!');
    const mortySmith = new User('supermorty@gmail.com', 'MortyMan', 'Morty', 'Smith', 'Password5678!');
    const summerSmith = new User('partysummer@gmail.com', 'SummerSarcasm', 'Summer', 'Smith', 'Password9876!');
    const jerrySmith = new User('jerrysmith5@gmail.com', 'JerryTheClueless', 'Jerry', 'Smith', 'Password4321!');
    const birdperson = new User('birdperson@gmail.com', 'AvianWisdom', 'Bird', 'Person', 'PasswordBird');
    const meeseeks = new User('mrmeeseeks@gmail.com', 'MrPodcaster', 'Meeseeks', 'Seeker', 'Password3453!');
    const unity = new User('unity@gmail.com', 'CollectiveInsights', 'Unity', 'United', 'Password7543!');
    const squanchy = new User('squanchy@gmail.com', 'SquanchPod', 'Squanchy', 'Squanched', 'Password1296!');
    const tammy = new User('tammy@gmail.com', 'IntergalacticAgent', 'Tammy', 'Guterman', 'Password1446!');

    const users = [rickSanchez, mortySmith, summerSmith, jerrySmith, birdperson, meeseeks, unity, squanchy, tammy];


    for (let i = 0; i < users.length; i += 5) {
      const batch = users.slice(i, i + 5);
      batch.forEach(user => em.persist(user));
      await em.flush();
      em.clear();
    }
  }
}


