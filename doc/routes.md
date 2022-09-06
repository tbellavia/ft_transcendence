# Back-end API Documentation

Users :
    - POST      /api/v1/users
        - Body 
        {
            username: string(20)
        }
    - GET       /api/v1/users?limit=<int>
    - GET       /api/v1/users/:username
    - PUT       /api/v1/users/:username
        - Body
        {
            avatar: string(),
            double_auth: boolean()
        }
    - DELETE    /api/v1/users/:username

Blocked :
    - POST      /api/v1/users/:username1/blocked/:username2
    - GET       /api/v1/users/:username/blocked?limit=<int>&skip=<int>
    - DELETE    /api/v1/users/:username1/blocked/:username2

Friends :
    - POST      /api/v1/users/:username1/friends/:username2
    - GET       /api/v1/users/:username1/friends?limit=<int>&skip=<int>&pending=<bool>
    - GET       /api/v1/users/:username1/friends/:username2
    - PUT       /api/v1/users/:username1/friends/:username2
        - Body
        {
            pending: bool
        }
    - DELETE    /api/v1/users/:username1/friends/:username2

Stats :
    - POST      /api/v1/users/:username/stats
    - GET       /api/v1/users/:username/stats
    - PUT       /api/v1/users/:username/stats
        - Body
        {
            game_total: int,
            game_won: int,
            game_abandonned: int,
            rank: RankEnum(GOLD, SILVER, BRONZE, WOOD),
        }
    - DELETE    /api/v1/users/:username/stats

Matches :
    - POST      /api/v1/users/:username1/matches/:username2
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