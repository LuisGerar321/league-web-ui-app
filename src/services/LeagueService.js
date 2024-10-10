import axios from "axios";

/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
export class LeagueService {
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    try {
      const winPoints = 3;
      const drawPoints = 1;
      const lossPoints = 0;

      const matches = this.getMatches();
      const teams = {};
      if (!matches) throw new Error("No matches fetched, try getting them...");

      for (let match of matches) {
        const homeScore = this.isValidScore(match.homeTeamScore) ? Number(match.homeTeamScore) : null;
        const awayScore = this.isValidScore(match.awayTeamScore) ? Number(match.awayTeamScore) : null;

        if (homeScore === null || awayScore === null) continue;

        // init state home team
        if (!teams.hasOwnProperty(match.homeTeam)) {
          teams[match.homeTeam] = {
            teamName: match.homeTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            head: {},
          };
        }

        // init state away state
        if (!teams.hasOwnProperty(match.awayTeam)) {
          teams[match.awayTeam] = {
            teamName: match.awayTeam,
            matchesPlayed: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            head: {},
          };
        }

        // meta for home team
        teams[match.homeTeam].matchesPlayed += 1;
        teams[match.homeTeam].goalsFor += homeScore;
        teams[match.homeTeam].goalsAgainst += awayScore;
        teams[match.homeTeam].points += homeScore > awayScore ? winPoints : homeScore === awayScore ? drawPoints : lossPoints;

        // meta for away team
        teams[match.awayTeam].matchesPlayed += 1;
        teams[match.awayTeam].goalsFor += awayScore;
        teams[match.awayTeam].goalsAgainst += homeScore;
        teams[match.awayTeam].points += awayScore > homeScore ? winPoints : awayScore === homeScore ? drawPoints : lossPoints;

        //head-to-head for home team
        if (!teams[match.homeTeam].head[match.awayTeam]) {
          teams[match.homeTeam].head[match.awayTeam] = 0;
        }
        if (homeScore > awayScore) {
          teams[match.homeTeam].head[match.awayTeam] += winPoints;
        } else if (homeScore === awayScore) {
          teams[match.homeTeam].head[match.awayTeam] += drawPoints;
        }

        //head-to-head for away team
        if (!teams[match.awayTeam].head[match.homeTeam]) {
          teams[match.awayTeam].head[match.homeTeam] = 0;
        }
        if (awayScore > homeScore) {
          teams[match.awayTeam].head[match.homeTeam] += winPoints;
        } else if (awayScore === homeScore) {
          teams[match.awayTeam].head[match.homeTeam] += drawPoints;
        }
      }

      const leaderboard = Object.values(teams).sort((a, b) => {
        // by points
        if (b.points !== a.points) return b.points - a.points;

        // ny head to head
        if (a.head[b.teamName] !== b.head[a.teamName]) return b.head[a.teamName] - a.head[b.teamName];

        // by goals diff
        const goalDifferenceA = a.goalsFor - a.goalsAgainst;
        const goalDifferenceB = b.goalsFor - b.goalsAgainst;
        if (goalDifferenceB !== goalDifferenceA) return goalDifferenceB - goalDifferenceA;

        // by goals for
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

        // by name
        return a.teamName.localeCompare(b.teamName);
      });
      return leaderboard;
    } catch (error) {
      console.log(error);
    }
  }

  isValidScore(score) {
    return !isNaN(score) && score !== undefined && score !== null && score !== "-";
  }

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */
  async fetchData() {
    try {
      const matches = (
        await axios.get("http://localhost:3001" + "/api/v1/getAllMatches", {
          headers: {
            Authorization: `Bearer ${this.token ?? "YuHBdSlDXY000xa8IlCm7Qgq4_s"}`,
          },
        })
      ).data.matches;

      this.setMatches(matches);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LeagueService;
