# Back-end API Documentation

Users :
    - POST      /api/v1/users
        - Body 
        {
            username: string(20),
            password: string(30)
        }
    - GET       /api/v1/users?limit=<int>
    - GET       /api/v1/users/:user_id
    - PUT       /api/v1/users/:user_id
        - Body
        {
            password: string(30),
        }
    - DELETE    /api/v1/users/:user_id

Blocked :
    - POST      /api/v1/users/:user1_id/blocked/:user2_id
    - GET       /api/v1/users/:user_id/blocked?limit=<int>
    - DELETE    /api/v1/users/:user1_id/blocked/:user2_id

Friends :
    - POST      /api/v1/users/:user1_id/friends/:user2_id
    - GET       /api/v1/users/:user_id/friends?limit=<int>&pending=<bool>
    - PUT       /api/v1/users/:user1_id/friends/:user2_id
        - Body
        {
            pending: bool
        }
    - DELETE    /api/v1/users/:user1_id/friends/:user2_id

Stats :
    - POST      /api/v1/users/:user_id/stats
    - GET       /api/v1/users/:user_id/stats
    - PUT       /api/v1/users/:user_id/stats
        - Body
        {
            game_total: int,
            game_won: int,
            game_abandonned: int,
            rank: RankEnum(GOLD, SILVER, BRONZE, WOOD),
        }
    - DELETE    /api/v1/users/:user_id/stats

Matches :
    - POST      /api/v1/users/:user1_id/matches/:user2_id
    - GET       /api/v1/users/:user_id/matches?limit=<int>&date=<date>
    - GET       /api/v1/users/:user1_id/matches/:user2_id
    - PUT       /api/v1/users/:user1_id/matches/:user2_id
        - Body
        {
            player_1_point: int,
            player_2_point: int,
            player_1_outcome: MatchOutcomeEnum(WON, LOST, ABANDONNED),
            player_2_outcome: MatchOutcomeEnum(WON, LOST, ABANDONNED),
            begin_date: Date,
            end_date: Date
        }
    - DELETE    /api/v1/users/:user1_id/matches/:user2_id