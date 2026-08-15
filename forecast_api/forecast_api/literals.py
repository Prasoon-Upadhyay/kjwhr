
class ENDPOINTS:
    FUELHH= "FUELHH/stream"
    WINDFOR= "WINDFOR/stream"

    
class Errors:
    EXTERNAL_API_FAILURE = 'Failed to fetch data from External API'
    DATA_PROCESSING_FAILURE = 'Failed to process data'
    SOMETHING_WENT_WRONG = "Something went wrong."

class ServiceDescriptors:
    PROCESS = "process"
    COMPUTE = "compute"
    DB = "db"
    CACHE = "cache"
    EXTERNAL_API = "external_api"

class OperationDescriptors:

    REQUEST_PARSE = "request parsing"
    RESPONSE_SERIALIZE = "response serialization"

    DATA_TRANSFORM = "data transformation"
    NUMPY_COMPUTE = "numerical compute"

    DB_QUERY = "database query"
    DB_INSERT = "database insert"

    CACHE_LOOKUP = "cache lookup"
    CACHE_WRITE = "cache write"

    EXTERNAL_REQUEST = "external api request"