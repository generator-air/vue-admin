const req = require.context('./', false, /\.svg$/)
const importAll = requireContext => requireContext.keys().forEach(requireContext)
importAll(req)
