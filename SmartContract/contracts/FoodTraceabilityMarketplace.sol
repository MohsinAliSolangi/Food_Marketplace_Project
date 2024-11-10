// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NftIsNotApproved();
error PleaseSendCorreactPrice();
error YouAreNotOwnerOfNFT();
error NFT_alreadyListed();
error TransferFailed();
error PleaseMakeAllowanceFirst();
error collectionAlreadyExits();

contract FoodTraceabilityMarketplace is ReentrancyGuard {
    struct UserAccount {
        string name;
        string email;
        uint phone_number;
        string role;
        bool isRegister;
    }

    struct AuctionDetails {
        address payable seller;
        uint256 basePrice;
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        uint256 starTime;
        bool ended;
        bool auction;
    }

    struct items {
        address payable seller;
        uint256 price;
        bool sale;
        bool listed;
    }

    event ItemListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemBought(
        address indexed buyer,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price
    );

    event ItemCanceled(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );

    uint256 public ListdItems;
    uint256 public totalAuctionSale;
    address[] public collection;

    mapping(address => mapping(uint256 => items)) public listing;
    mapping(address => mapping(uint256 => AuctionDetails))
        public _auctionDetail;
    mapping(address => UserAccount) public registerationAccount;

    function registerAsUser(
        string memory _name,
        string memory _email,
        uint _phone_number,
        string memory _role
    ) public {
        require(!isUser(msg.sender), "You are already registered");
        registerationAccount[msg.sender] = UserAccount(
            _name,
            _email,
            _phone_number,
            _role,
            true
        );
    }

    function isUser(address _address) public view returns (bool) {
        return registerationAccount[_address].isRegister;
    }

    function sellItem(address _nft, uint256 _tokenId, uint256 _price) public {
        if (listing[_nft][_tokenId].listed == true) {
            revert NFT_alreadyListed();
        }
        if (IERC721(_nft).getApproved(_tokenId) != address(this)) {
            revert NftIsNotApproved();
        }
        ListdItems++;
        listing[_nft][_tokenId] = items(
            payable(msg.sender),
            _price,
            false,
            true
        );

        bool temp;
        for (uint256 i = 0; i < collection.length; i++) {
            if (collection[i] == _nft) {
                temp = true;
            }
        }
        if (temp == false) {
            collection.push(_nft);
        }

        emit ItemListed(msg.sender, _nft, _tokenId, _price);
    }

    function buyItem(address _nft, uint256 _tokenId) public payable {
        items storage Items = listing[_nft][_tokenId];
        if (msg.value < Items.price) {
            revert PleaseSendCorreactPrice();
        }
        (bool success, ) = payable(Items.seller).call{value: msg.value}("");
        if (!success) {
            revert TransferFailed();
        }
        Items.sale = true;
        Items.listed = false;
        IERC721(_nft).safeTransferFrom(Items.seller, msg.sender, _tokenId);
        delete (listing[_nft][_tokenId]);
        emit ItemBought(msg.sender, _nft, _tokenId, Items.price);
    }

    ////////////////// Auctions /////////////////////////

    function createAuction(
        address _nft,
        uint256 _tokenId,
        uint256 _basePrice,
        uint256 _endTime
    ) public {
        if (IERC721(_nft).getApproved(_tokenId) != address(this)) {
            revert NftIsNotApproved();
        }
        ListdItems++;
        _auctionDetail[_nft][_tokenId] = AuctionDetails(
            payable(msg.sender),
            _basePrice,
            address(0),
            0,
            _endTime,
            block.timestamp,
            false,
            true
        );
        listing[_nft][_tokenId] = items(
            payable(msg.sender),
            _basePrice,
            false,
            true
        );
        emit ItemListed(msg.sender, _nft, _tokenId, _basePrice);
    }

    function bid(address _nft, uint256 _tokenId) public payable nonReentrant {
        AuctionDetails storage auction = _auctionDetail[_nft][_tokenId];
        require(auction.ended == false, "Auction has ended");
        require(auction.seller != address(0), "Auction does not exist");

        _updateStatus(_nft, _tokenId);

        if (block.timestamp < auction.endTime) {
            require(
                auction.highestBid < msg.value &&
                    auction.basePrice <= msg.value,
                "Bid must be higher than the current highest bid and base price"
            );
            require(
                msg.sender != auction.seller,
                "You cannot bid in your own auction"
            );

            address payable prevBidder = payable(auction.highestBidder);

            if (prevBidder != address(0)) {
                (bool success, ) = prevBidder.call{value: auction.highestBid}(
                    ""
                );
                require(success, "Failed to refund previous bidder");
            }

            auction.highestBid = msg.value;
            auction.highestBidder = payable(msg.sender);
        } else {
            revert("Auction has already ended");
        }
    }

    //This function is use for is Auction End or Not
    function _checkAuctionStatus(
        address _nft,
        uint256 _tokenId
    ) public view returns (bool) {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        require(
            auction.seller != address(0),
            "Auction for this NFT is not in progress"
        );
        return auction.ended;
    }


    function _updateStatus(address _nft, uint256 _tokenId) internal {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        require(auction.ended == false, "This auction has Ended");

        if (block.timestamp > auction.endTime) {
            auction.ended = true;
        }
        _auctionDetail[_nft][_tokenId] = auction;
        _auctionDetail[_nft][_tokenId].auction = false;
    }

    function isAuction(
        address _nft,
        uint256 _tokenId
    ) public view returns (bool) {
        if (_auctionDetail[_nft][_tokenId].auction == true) {
            return true;
        } else {
            return false;
        }
    }

    function getLastTime(
        address _nft,
        uint256 _tokenId
    ) public view returns (uint256) {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        return auction.endTime;
    }

    function cancellAuction(address _nft, uint256 _tokenId) public {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        require(
            msg.sender == _auctionDetail[_nft][_tokenId].seller,
            "You are not Owner of this NFT"
        );
        require(auction.endTime < block.timestamp, "Auction Time remaining");
        bool ended = _checkAuctionStatus(_nft, _tokenId);
        if (!ended) {
            _updateStatus(_nft, _tokenId);
        }
        items memory Items = listing[_nft][_tokenId];
        Items.listed = false;
        listing[_nft][_tokenId] = Items;
    }

    function getHighestBid(
        address _nft,
        uint256 _tokenId
    ) public view returns (uint256) {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        return auction.highestBid;
    }

    function getHighestBidder(
        address _nft,
        uint256 _tokenId
    ) public view returns (address) {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        return auction.highestBidder;
    }

    //This function is concludeAuction finilise the highest bider
    function concludeAuction(
        address _nft,
        uint256 _tokenId,
        address _token
    ) public {
        AuctionDetails memory auction = _auctionDetail[_nft][_tokenId];
        require(
            msg.sender == auction.highestBidder,
            "You are not authorized to conclude the auction"
        );
        require(auction.endTime < block.timestamp, "Auction Time remaining");

        bool ended = _checkAuctionStatus(_nft, _tokenId);
        if (!ended) {
            _updateStatus(_nft, _tokenId);
        }
        items memory Item = listing[_nft][_tokenId];
        IERC721(_nft).transferFrom(Item.seller, msg.sender, _tokenId);
        Item.sale = true;
        IERC20(_token).transferFrom(
            auction.highestBidder,
            Item.seller,
            auction.highestBid
        );
        totalAuctionSale++;
        listing[_nft][_tokenId] = Item;
        emit ItemBought(msg.sender, _nft, _tokenId, auction.highestBid);
    }
}
