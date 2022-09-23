# Back-end API Documentation

Users :
    - POST      /api/v1/users
        - Body 
        {
            username: string(20)
        }
    - GET       /api/v1/users?limit=<int>
    - GET       /api/v1/users/:username
    - GET       /api/v1/users/:username/avatar
    - PUT       /api/v1/users/:username/avatar
    - PUT       /api/v1/users/:username
        - Body
        {
            username: string()
            double_auth: boolean()
        }
    - DELETE    /api/v1/users/:username

Blocked :
    - POST      /api/v1/users/blocked/me/:target
    - GET       /api/v1/users/blocked/me?limit=<int>&skip=<int>
    - DELETE    /api/v1/users/blocked/me/:target

Friends :
    - POST      /api/v1/users/friends/me/:target
    - GET       /api/v1/users/friends/me?limit=<int>&skip=<int>&pending=<bool>
    - GET       /api/v1/users/friends/me/request?limit=<int>&skip=<int>
    - PUT       /api/v1/users/friends/me/:target
        - Body
        {
            pending: bool
        }
    - DELETE    /api/v1/users/friends/me/:target

Stats :
    - POST      /api/v1/users/stats/me 
    - GET       /api/v1/users/:username/stats
    - GET       /api/v1/users/stats/me
    - PUT       /api/v1/users/stats/me
        - Body
        {
            game_total: int,
            game_won: int,
            game_abandonned: int,
            rank: RankEnum(GOLD, SILVER, BRONZE, WOOD),
        }
    - DELETE    /api/v1/users/stats/me

Matches :
    - GET       /api/v1/users/matches/all?limit=<int>&skip=<int>
    - GET       /api/v1/users/matches/:match_id
    - GET       /api/v1/users/:username/matches?limit=<int>&skip=<int>&date=<date>
    - GET       /api/v1/users/:username1/matches/:username2?limit=<int>&skip=<int>\
    <!-- Get the latest match between user 1 and user 2 -->
    - GET       /api/v1/users/:username1/matches/:username2/last
    <!-- Get the latest match of user -->
    - GET       /api/v1/users/:username/matches/last
    - PUT       /api/v1/users/matches/:match_id
        - Body
        {
            player_1_point: int,
            player_2_point: int,
            player_1_outcome: MatchOutcomeEnum(WON, LOST, ABANDONNED),
            player_2_outcome: MatchOutcomeEnum(WON, LOST, ABANDONNED),
            end_date: Date
        }
    - DELETE    /api/v1/users/matches/:match_id